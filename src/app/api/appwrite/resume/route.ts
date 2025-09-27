import { ResumeSchema } from '@/data/constants/types';
import { MODELS } from '@/data/constants/workflow';
import { getAppwriteClient } from '@/lib/server/appwrite';
import { decrypt, encrypt } from '@/lib/server/crypto';
import { ratelimit } from '@/lib/server/rateLimiter';
import { Response } from '@/lib/server/response';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { ID, Query } from 'node-appwrite';

// helper to compare objects deeply
function isEqual(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return Response({ message: 'Unauthorized Access: Login to access!', type: 'error' }, 401);
    }

    const body = await req.json();
    const { databases } = getAppwriteClient();
    const email = session.user.email;

    const { success, limit, remaining, reset } = await ratelimit.limit(session.user.id);

    if (!success) {
        const retryAfter = Math.ceil(reset / 1000);
        console.log({
            status: 429,
            headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'Retry-After': retryAfter.toString(),
            },
        });

        return Response({ error: 'Too many requests, slow down!' }, 429);
    }

    // 1. Validate early
    if (
        typeof body.api_key !== 'string' ||
        !MODELS.includes(body.model) ||
        ResumeSchema.safeParse(body.resume_user_data).error
    ) {
        return Response({ message: 'Invalid data format', type: 'error' }, 400);
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
                return Response({ message: 'Document updated ✅', type: 'success' }, 200);
            }

            // 3b. Same data → no change
            return Response(
                { message: 'No changes detected. Document already up-to-date.', type: 'info' },
                200
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

        return Response({ message: 'Document created successfully 🚀', type: 'success' }, 201);
    } catch (error) {
        console.error('Appwrite error:', error);
        return Response({ message: 'Something went wrong', type: 'error' }, 500);
    }
}

export async function GET() {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return Response({ message: 'Unauthorized Access: Login to access!', type: 'error' }, 401);
    }

    const { success, limit, remaining, reset } = await ratelimit.limit(session.user.id);

    if (!success) {
        const retryAfter = Math.ceil(reset / 1000);
        console.log({
            status: 429,
            headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'Retry-After': retryAfter.toString(),
            },
        });

        return Response({ error: 'Too many requests, slow down!' }, 429);
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
            return Response({ message: "User collection doesn't exist!", type: 'info' }, 404);
        }

        const doc = existing.documents[0];
        const result = {
            ...doc,
            api_key: decrypt(doc.api_key, process.env.ENCRYPTION_KEY_PHRASE!, email),
            resume_user_data: JSON.parse(doc.resume_user_data),
        };

        return Response(result, 200);
    } catch (error) {
        console.error('Appwrite error:', error);
        return Response({ message: 'Something went wrong', type: 'error' }, 500);
    }
}
