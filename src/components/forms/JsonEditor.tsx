'use client';

import { useUI } from '@/context/UIContext';
import { ResumeDataTypeZod } from '@/data/constants/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function JsonEditor({
    resumeUserData,
    setResumeUserData,
}: {
    resumeUserData: ResumeDataTypeZod;
    setResumeUserData: Dispatch<SetStateAction<ResumeDataTypeZod>>;
}) {
    const [dataText, setDataText] = useState<string>(JSON.stringify(resumeUserData, null, 4));
    const { setToast } = useUI();

    useEffect(() => {
        const handler = setTimeout(() => {
            try {
                setResumeUserData(JSON.parse(dataText));
                setToast({ type: 'success', message: 'Sucess: Updated Global Resume Data!' });
            } catch (e) {
                setToast({
                    type: 'info',
                    message: 'Warning: Invalid JSON, not updating global state',
                });
            }
        }, 1000); // ⏱ 1 second debounce

        return () => clearTimeout(handler);
    }, [dataText, setResumeUserData]);

    return (
        <div>
            <label className="mb-2 block text-sm font-medium">Resume JSON</label>
            <textarea
                rows={14}
                value={dataText}
                onChange={(e) => setDataText(e.target.value)}
                className="border-ui-muted bg-light focus:border-primary-intense focus:ring-primary-intense w-full rounded-lg border-2 px-3 py-2 font-mono text-sm transition outline-none focus:ring-2"
            />
            <p className="text-dark-muted/70 mt-2 text-xs">
                Keep keys like: <code>name, email, phone, summary, skills[], experience[]</code>.
            </p>
        </div>
    );
}
