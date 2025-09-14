import { ResumeDataType } from '@/data/constants/types';

export function createNewUserDocument(
    data: Readonly<{
        resume_user_data: ResumeDataType;
        api_key: string;
        model: string;
    }>
) {
    async function routeFetch() {
        try {
            const res = await fetch('/api/appwrite/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error(`Failed: ${res.status}`);

            return await res.json();
        } catch (error: any) {
            return { message: error.message || 'Unknown error', type: 'error' };
        }
    }

    return routeFetch();
}

export function getUserDocument() {
    async function routeFetch() {
        try {
            const res = await fetch('/api/appwrite/resume', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error(`Failed: ${res.status}`);

            return await res.json();
        } catch (error: any) {
            return { message: error.message || 'Unknown error', type: 'error' };
        }
    }

    return routeFetch();
}
