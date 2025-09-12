import { getAppwriteClient } from '@/lib/appwrite';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Query } from 'node-appwrite';
import { GoogleGenAI } from '@google/genai';
import { decrypt } from '@/lib/crypto';

const PROMPT = `You are an AI assistant that optimizes resumes for ATS (Applicant Tracking Systems). You will receive structured resume data as input and must generate tailored suggestions in strict JSON format.  

Rules (follow strictly):
1. **Do NOT change factual information** such as:
   - Name
   - Email
   - Phone
   - Location
   - Links (GitHub, LinkedIn, Portfolio, etc.)
   - Company names, Job titles, Institutes, Courses
   - Dates, unless the user explicitly requests to remove them
   - Grades, certifications, achievements, issuers
2. You may ONLY improve **descriptions and summaries** by:
   - Rephrasing for clarity and professionalism
   - Adding ATS-friendly keywords relevant to the job description
   - Formatting into bullet points where applicable (\`\n- \` for each bullet point)
   - Making sentences concise, impactful, and action-oriented
   - Preserving the original context and meaning
3. Respect **user preferences** passed along with the input (e.g., "don’t add dates", "use bullet points instead of paragraphs").
4. Ensure the output strictly matches this schema:

\`\`\`ts
OptionsType: {
  "option1": string,
  "option2": string
}

SuggestionsType: {
  "summary": OptionsType[],
  "experience": OptionsType[],
  "projects": OptionsType[],
  "skills": OptionsType[],
  "education": OptionsType[],
  "languages": OptionsType[],
  "achievement": OptionsType[]
}
\`\`\`

5. Output must be **valid JSON only**. No explanations, comments, or extra text.`;

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
                `Here is the Resume User Data JSON: ${JSON.stringify(existing.documents[0].resume_user_data)}\n\nThis is the Job Description: ${body.jd}`
        );

        const response = await ai.models.generateContent({
            model: existing.documents[0].model,
            contents:
                PROMPT +
                `Here is the Resume User Data JSON: ${JSON.stringify(existing.documents[0].resume_user_data)}\n\nThis is the Job Description: ${body.jd}`,
        });
        console.log(response.text);
        return NextResponse.json(
            JSON.parse(response.text?.replace(/```json\n?|\n?```/g, '') as string),
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message, type: 'error' },
            { status: error.status || 500 }
        );
    }
}
