export function getResumeSuggestions(jd: string, userPref?: string) {
    async function routeFetch() {
        try {
            const res = await fetch('/api/ai/suggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jd: jd,
                    userPref: userPref,
                }),
            });

            if (!res.ok) throw new Error(`Failed: ${res.status}`);

            return await res.json();
        } catch (error: any) {
            return { message: error.message || 'Unknown error', type: 'error' };
        }
    }

    return routeFetch();
}
