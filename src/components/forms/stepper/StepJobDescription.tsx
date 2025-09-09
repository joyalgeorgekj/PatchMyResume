import { Dispatch, SetStateAction } from 'react';

export default function StepJobDescription({
    jobDescription,
    setJobDescription,
}: {
    jobDescription: string;
    setJobDescription: Dispatch<SetStateAction<string>>;
}) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
            <textarea
                wrap="hard"
                rows={5}
                minLength={50}
                maxLength={500}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description here..."
                required
                className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
            ></textarea>
            <p className="text-dark-muted mt-1 text-xs">Min 50 chars, Max 500 chars</p>
        </section>
    );
}
