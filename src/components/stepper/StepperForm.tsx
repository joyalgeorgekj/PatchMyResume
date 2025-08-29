'use client';

import { useState } from 'react';
import db from '@/db.json';
import StepSelectModel from './steps/StepSelectModel';
import StepResumeData from './steps/StepResumeData';
import StepJobDescription from './steps/StepJobDescription';
import StepperSidebar from './steps/StepperSidebar';

export const steps = [
    { id: 1, title: 'Select Model & API', description: 'Choose AI model & provide API key' },
    { id: 2, title: 'Resume Data', description: 'Upload or edit your resume JSON' },
    { id: 3, title: 'Job Description', description: 'Paste job description and submit' },
];

export default function StepperForm() {
    const [step, setStep] = useState(1);

    // mock db state
    const [apiKey, setApiKey] = useState(db.user.apiKey || '');
    const [model, setModel] = useState(db.user.model || 'gemini-1.5-flash');
    const [resumeData, setResumeData] = useState(JSON.stringify(db.user.resumeData, null, 2));
    const [jobDescription, setJobDescription] = useState('');

    const nextStep = () => {
        if (step === 1 && !apiKey) {
            alert('API Key is required');
            return;
        }
        if (step === 2 && !resumeData) {
            alert('Resume JSON is required');
            return;
        }
        setStep((s) => Math.min(s + 1, steps.length));
    };
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = () => {
        if (!apiKey || !resumeData || !jobDescription) {
            alert('Please fill all required fields');
            return;
        }
        console.log('API_KEY:', apiKey);
        console.log('Model:', model);
        console.log('Resume:', resumeData);
        console.log('Job Description:', jobDescription);
        alert('Form submitted! Check console for data.');
    };

    return (
        <div className="bg-light-muted flex min-h-screen items-center justify-center px-4">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
                {/* Sidebar */}
                <div className="py-6 md:col-span-1">
                    <StepperSidebar step={step} />
                </div>

                {/* Step Content */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="bg-light text-dark h-fit rounded-2xl p-6 shadow-lg md:col-span-2"
                >
                    {step === 1 && (
                        <StepSelectModel
                            model={model}
                            setModel={setModel}
                            apiKey={apiKey}
                            setApiKey={setApiKey}
                        />
                    )}
                    {step === 2 && (
                        <StepResumeData resumeData={resumeData} setResumeData={setResumeData} />
                    )}
                    {step === 3 && (
                        <StepJobDescription
                            jobDescription={jobDescription}
                            setJobDescription={setJobDescription}
                        />
                    )}

                    {/* Navigation */}
                    <div className="mt-6 flex justify-between">
                        {step > 1 && (
                            <button
                                onClick={prevStep}
                                className="bg-ui-muted text-dark hover:bg-ui-intense rounded-lg px-4 py-2"
                                type="button"
                            >
                                Back
                            </button>
                        )}
                        {step < steps.length && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary-intense ml-auto rounded-lg px-4 py-2 text-white"
                            >
                                Next
                            </button>
                        )}
                        {step === steps.length && (
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary-intense ml-auto rounded-lg px-4 py-2 text-white"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
