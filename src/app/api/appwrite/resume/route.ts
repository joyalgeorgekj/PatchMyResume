import { getAppwriteClient } from '@/lib/appwrite';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { ID, Query } from 'node-appwrite';

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    const body = await req.json();
    const { databases } = getAppwriteClient();

    if (!session?.user?.email) {
        return NextResponse.json({
            message: 'Unauthorized Access: Login to access!',
            status: 401,
            type: 'error',
        });
    }

    const existing = await databases.listDocuments(
        process.env.APPWRITE_DB_ID!,
        process.env.APPWRITE_COLLECTION_ID!,
        [Query.equal('email', session.user.email)]
    );
    if (existing.documents.length > 0)
        return NextResponse.json({
            message: 'User collection already exist!',
            status: 409,
            type: 'info',
        });

    try {
        if (body.resume_user_data && body.api_key && body.model) {
            databases.createDocument(
                process.env.APPWRITE_DB_ID!,
                process.env.APPWRITE_COLLECTION_ID!,
                ID.unique(),
                {
                    email: session.user.email,
                    resume_user_data: JSON.stringify(body.resume_user_data),
                    api_key: body.api_key,
                    model: body.model,
                }
            );
        }
        return NextResponse.json({
            message: 'Document created successfully 🚀',
            status: 200,
            type: 'sucess',
        });
    } catch (error: any) {
        console.error('Appwrite error:', error);
        return NextResponse.json({ message: error.message, status: 500, type: 'error' });
    }
}

export async function GET() {
    const session = await getServerSession();
    const { databases } = getAppwriteClient();

    if (!session?.user?.email) {
        return NextResponse.json({
            message: 'Unauthorized Access: Login to access!',
            status: 401,
            type: 'error',
        });
    }

    const existing = await databases.listDocuments(
        process.env.APPWRITE_DB_ID!,
        process.env.APPWRITE_COLLECTION_ID!,
        [Query.equal('email', session.user.email)]
    );
    if (existing.documents.length === 0)
        return NextResponse.json({
            message: "User collection doesn't exist!",
            status: 409,
            type: 'info',
        });
    if (existing.documents.length > 0)
        existing.documents = existing.documents.map((val) => ({...val, resume_user_data: JSON.parse(val.resume_user_data)}));
    return Response.json(existing.documents[0]);
}
