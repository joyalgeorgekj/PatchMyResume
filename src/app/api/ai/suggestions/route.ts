import { getAppwriteClient } from '@/lib/server/appwrite';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Query } from 'node-appwrite';
import { GoogleGenAI } from '@google/genai';
import { decrypt } from '@/lib/server/crypto';
import { PROMPT } from '@/data/prompts/atsPrompt';

function cleanJSON(raw: string): string {
    return raw
        .replace(/```json\n?|\n?```/g, '') // remove markdown fences
        .replace(/\n/g, ' ') // flatten newlines
        .replace(/,\s*([}\]])/g, '$1') // remove trailing commas
        .trim();
}

function validateJD(jd: string) {
    if (jd !== '' && typeof jd === 'string') {
        return true;
    }

    return false;
}

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    const { databases } = getAppwriteClient();
    const body = await req.json();

    if (!session?.user?.email) {
        return NextResponse.json({
            message: 'Unauthorized Access: Login to access!',
            status: 401,
            type: 'error',
        });
    }
    const email = session.user.email;

    try {
        const existing = await databases.listDocuments(
            process.env.APPWRITE_DB_ID!,
            process.env.APPWRITE_COLLECTION_ID!,
            [Query.equal('email', email)]
        );
        if (existing.documents.length === 0)
            return NextResponse.json(
                {
                    message: "User collection doesn't exist!",
                    type: 'info',
                },
                {
                    status: 409,
                }
            );
        if (existing.documents.length > 0)
            existing.documents = existing.documents.map((val) => ({
                ...val,
                resume_user_data: JSON.parse(val.resume_user_data),
            }));

        const ai = new GoogleGenAI({
            apiKey: decrypt(
                existing.documents[0].api_key,
                process.env.ENCRYPTION_KEY_PHRASE!,
                email
            ),
        });

        console.log(
            PROMPT +
                `- Here is the Resume User Data JSON: ${JSON.stringify(existing.documents[0].resume_user_data)}\n\n- This is the Job Description: ${body.jd}`
        );

        const response = await ai.models.generateContent({
            model: existing.documents[0].model,
            contents:
                PROMPT +
                `- Here is the Resume User Data JSON: ${JSON.stringify(existing.documents[0].resume_user_data)}\n\n- This is the Job Description: ${body.jd}`,
        });

        const raw = response.text || '';
        const cleaned = cleanJSON(raw);

        let parsed;
        try {
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error('Failed to parse AI JSON:', cleaned);
            throw e; // or return error response
        }

        return NextResponse.json(parsed, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message, type: 'error' },
            { status: error.status || 500 }
        );
    }
}
