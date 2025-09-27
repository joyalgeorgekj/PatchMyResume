import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import { Dispatch, SetStateAction } from 'react';

export default function StepJobDescription({
    jobDescription,
    setJobDescription,
    setUserPref,
    userPref,
}: {
    jobDescription: string;
    setJobDescription: Dispatch<SetStateAction<string>>;
    setUserPref: Dispatch<SetStateAction<string>>;
    userPref: string;
}) {
    return (
        <section>
            <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
            <Textarea
                id="job_descrption"
                rows={5}
                defaultValue={jobDescription}
                updator={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description here..."
                required
                className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
            ></Textarea>
            <p className="text-dark-muted mt-1 text-xs">Min 50 chars, Max 500 chars</p>

            <Input
                defaultValue={userPref}
                id="custom message for AI"
                seoedId="user_pref"
                updator={(e) => setUserPref(e.target.value)}
                className="mt-4"
            />
        </section>
    );
}
