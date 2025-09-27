import { getAppwriteClient } from '@/lib/server/appwrite';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { Query } from 'node-appwrite';
import { GoogleGenAI } from '@google/genai';
import { decrypt } from '@/lib/server/crypto';
import { PROMPT } from '@/data/prompts/atsPrompt';
import { Response } from '@/lib/server/response';
import { ratelimit } from '@/lib/server/rateLimiter';

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
        return Response(
            {
                message: 'Unauthorized Access: Login to access!',
                status: 401,
                type: 'error',
            },
            401
        );
    }
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

    if (validateJD(body.jd) === false) {
        return Response(
            {
                message: 'Invalid data registered',
                type: 'info',
            },
            200
        );
    }

    try {
        const existing = await databases.listDocuments(
            process.env.APPWRITE_DB_ID!,
            process.env.APPWRITE_COLLECTION_ID!,
            [Query.equal('email', email)]
        );
        if (existing.documents.length === 0)
            return Response(
                {
                    message: "User collection doesn't exist!",
                    type: 'info',
                },
                409
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

        const response = await ai.models.generateContent({
            model: existing.documents[0].model,
            contents:
                PROMPT +
                `- Here is the Resume User Data JSON: ${JSON.stringify(existing.documents[0].resume_user_data)}\n\n- This is the Job Description: ${body.jd}\n\n- User Preference: ${validateJD(body.userPref) ? body.userPref : ''}`,
        });

        const raw = response.text || '{}';
        const cleaned = cleanJSON(raw);

        let parsed;
        try {
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error('Failed to parse AI JSON:', cleaned);
            throw e; // or return error response
        }
        console.log(parsed);

        return Response(parsed, 200);
    } catch (error: any) {
        console.log(error);
        return Response({ message: error.message, type: 'error' }, Number(error.status) || 500);
    }
}
