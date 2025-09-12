import { getAppwriteClient } from '@/lib/appwrite';
import { decrypt, encrypt } from '@/lib/crypto';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { ID, Query } from 'node-appwrite';

// helper to compare objects deeply
function isEqual(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json(
            { message: 'Unauthorized Access: Login to access!', type: 'error' },
            { status: 401 }
        );
    }

    const body = await req.json();
    const { databases } = getAppwriteClient();
    const email = session.user.email;

    // 1. Validate early
    if (
        typeof body.api_key !== 'string' ||
        typeof body.model !== 'string' ||
        typeof body.resume_user_data !== 'object'
    ) {
        return NextResponse.json(
            { message: 'Invalid data format', type: 'error' },
            { status: 400 }
        );
    }

    try {
        // 2. Check for existing doc
        const existing = await databases.listDocuments(
            process.env.APPWRITE_DB_ID!,
            process.env.APPWRITE_COLLECTION_ID!,
            [Query.equal('email', email)]
        );

        const encryptedKey = encrypt(body.api_key, process.env.ENCRYPTION_KEY_PHRASE!, email);

        if (existing.documents.length > 0) {
            const doc = existing.documents[0];
            const existingData = JSON.parse(doc.resume_user_data);

            if (!isEqual(existingData, body.resume_user_data)) {
                // 3a. Update if data differs
                await databases.updateDocument(
                    process.env.APPWRITE_DB_ID!,
                    process.env.APPWRITE_COLLECTION_ID!,
                    doc.$id,
                    {
                        resume_user_data: JSON.stringify(body.resume_user_data),
                        api_key: encryptedKey,
                        model: body.model,
                    }
                );
                return NextResponse.json(
                    { message: 'Document updated ✅', type: 'success' },
                    { status: 200 }
                );
            }

            // 3b. Same data → no change
            return NextResponse.json(
                { message: 'No changes detected. Document already up-to-date.', type: 'info' },
                { status: 200 }
            );
        }

        // 4. Create new doc if none exists
        await databases.createDocument(
            process.env.APPWRITE_DB_ID!,
            process.env.APPWRITE_COLLECTION_ID!,
            ID.unique(),
            {
                email,
                resume_user_data: JSON.stringify(body.resume_user_data),
                api_key: encryptedKey,
                model: body.model,
            }
        );

        return NextResponse.json(
            { message: 'Document created successfully 🚀', type: 'success' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Appwrite error:', error);
        return NextResponse.json(
            { message: 'Something went wrong', type: 'error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json(
            { message: 'Unauthorized Access: Login to access!', type: 'error' },
            { status: 401 }
        );
    }

    const { databases } = getAppwriteClient();
    const email = session.user.email;

    try {
        const existing = await databases.listDocuments(
            process.env.APPWRITE_DB_ID!,
            process.env.APPWRITE_COLLECTION_ID!,
            [Query.equal('email', email)]
        );

        if (existing.documents.length === 0) {
            return NextResponse.json(
                { message: "User collection doesn't exist!", type: 'info' },
                { status: 404 }
            );
        }

        const doc = existing.documents[0];
        const result = {
            ...doc,
            api_key: decrypt(doc.api_key, process.env.ENCRYPTION_KEY_PHRASE!, email),
            resume_user_data: JSON.parse(doc.resume_user_data),
        };

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Appwrite error:', error);
        return NextResponse.json(
            { message: 'Something went wrong', type: 'error' },
            { status: 500 }
        );
    }
}
