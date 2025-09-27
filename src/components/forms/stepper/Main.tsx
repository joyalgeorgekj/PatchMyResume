import { useUI } from '@/context/UIContext';
import { ResumeDataTypeZod, ResumeSchema, SuggestionsType } from '@/data/constants/types';
import { useEffect, useState } from 'react';
import StepApiModel from './StepApiModel';
import StepResumeData from './StepResumeData';
import StepJobDescription from './StepJobDescription';
import StepFinalPreview from './StepFinalPreview';
import StepAiSuggestions from './StepAiSuggestions';
import { getResumeSuggestions } from '@/lib/ai';
import { ExampleResume } from '@/data/examples/resume';
import { STEPS } from '@/data/constants/workflow';
import { useUserData } from '@/context/UserContext';
import { generateResume } from '@/lib/template';

export type AiDataType = {
    API_KEY: string;
    Model: string;
};

export default function Main() {
    const { setToast, setLoader } = useUI();
    const { setUserData, userData } = useUserData();
    const [step, setStep] = useState<number>(1);
    // data to be collected
    // Api Model
    const [aiApiModel, setAiApiModel] = useState<AiDataType>({
        API_KEY: '',
        Model: 'gemini-1.5-flash',
    });
    // Resume Data
    const [resumeUserData, setResumeUserData] = useState<ResumeDataTypeZod>(ExampleResume);
    // Job Description
    const [jobDescription, setJobDescription] = useState<string>('');
    // Job Description
    const [userPref, setUserPref] = useState<string>('');
    // AI
    const [suggestions, setSuggestions] = useState<SuggestionsType | null>(null);
    // Preview
    const [final, setFinal] = useState<ResumeDataTypeZod>(ExampleResume);

    // form control
    const prevStep = () => {
        setStep((prev) => prev - 1);
    };
    const nextStep = () => {
        const goNext = () => setStep((prev) => (prev < STEPS.length ? prev + 1 : prev));

        switch (step) {
            case 1: {
                if (aiApiModel.API_KEY && aiApiModel.Model) {
                    goNext();
                } else {
                    setToast({ type: 'error', message: 'API Key and Model is Required' });
                }
                break;
            }
            case 2: {
                const validation = ResumeSchema.safeParse(resumeUserData);
                console.log(validation);

                if (validation.success) {
                    setUserData({
                        resume_user_data: resumeUserData,
                        api_key: aiApiModel.API_KEY,
                        model: aiApiModel.Model,
                    });
                    goNext();
                } else {
                    console.warn(validation.error);
                    setToast({ type: 'error', message: 'Resume Data is Required' });
                }
                break;
            }
            case 3: {
                if (!jobDescription) {
                    setToast({ type: 'error', message: 'Job Description is Required' });
                    break;
                }

                setLoader({ active: true, message: 'Formatting data' });

                getResumeSuggestions(jobDescription, userPref)
                    .then(async (res) => {
                        const messages = [
                            'Sending data to AI',
                            'AI Processing Data',
                            'Creating Suggestions',
                        ];

                        for (const msg of messages) {
                            setLoader({ active: true, message: msg });
                            await new Promise((r) => setTimeout(r, 1200));
                        }

                        setSuggestions(res);
                        setToast({ type: 'success', message: 'Suggestion has been updated' });
                        goNext();
                    })
                    .catch(() =>
                        setToast({ type: 'error', message: 'Failed to fetch suggestions' })
                    )
                    .finally(() => setLoader({ active: false }));
                break;
            }
            case 4: {
                suggestions ? goNext() : setToast({ type: 'error', message: 'Pick Suggestions' });
                break;
            }
            case 5: {
                generateResume(final);
                resumeUserData
                    ? goNext()
                    : setToast({ type: 'success', message: 'Data Successfully Extracted' });
                break;
            }
        }
    };

    useEffect(() => {
        if (userData === null) return;
        if (userData.model && userData.api_key)
            setAiApiModel({ Model: userData.model, API_KEY: userData.api_key });
        if (userData.resume_user_data) {
            setResumeUserData(userData.resume_user_data);
            setFinal(userData.resume_user_data);
        }
    }, [userData]);

    useEffect(() => {
        console.log('API and Model: ', aiApiModel);
    }, [aiApiModel]);

    useEffect(() => {
        console.log('AI Pref: ', userPref);
    }, [userPref]);

    useEffect(() => {
        console.log('User Resume Data: ', resumeUserData);
    }, [resumeUserData]);

    useEffect(() => {
        console.log('Job Description: ', jobDescription);
    }, [jobDescription]);

    useEffect(() => {
        console.log('AI Suggestions: ', suggestions);
    }, [suggestions]);

    useEffect(() => {
        console.log('Final Resume Data: ', final);
    }, [final]);

    return (
        <main aria-label="Resume Builder" className="bg-light text-dark mx-auto max-w-7xl">
            {/* Progress */}
            <section className="mx-auto max-w-5xl px-6 py-3 lg:px-12">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">Resume Builder</h1>
                    <p className="text-dark-muted/80 mt-1 text-sm">
                        Tailor your resume in {STEPS.length} steps
                    </p>
                </header>

                {/* Stepper indicator */}
                <nav aria-label="Progress" className="mb-8">
                    <ol className="hidden items-center justify-between md:flex">
                        {STEPS.map((val) => (
                            <li key={val.id} className="flex-1 text-center">
                                <div
                                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${step >= val.id ? 'bg-primary-muted text-light' : 'bg-light-muted text-dark'}`}
                                >
                                    {val.id}
                                </div>
                                <p className="mt-2 text-xs font-medium">{val.label}</p>
                            </li>
                        ))}
                    </ol>
                </nav>
            </section>

            {/* Content */}
            <section className="mx-auto max-w-5xl px-6 py-3 lg:px-12">
                <div className="border-dark-muted/10 bg-light rounded-2xl border p-6 shadow-lg">
                    {step === 1 && (
                        <StepApiModel aiApiModel={aiApiModel} setAiApiModel={setAiApiModel} />
                    )}
                    {step === 2 && (
                        <StepResumeData
                            resumeUserData={resumeUserData}
                            setResumeUserData={setResumeUserData}
                        />
                    )}
                    {step === 3 && (
                        <StepJobDescription
                            setUserPref={setUserPref}
                            userPref={userPref}
                            jobDescription={jobDescription}
                            setJobDescription={setJobDescription}
                        />
                    )}
                    {step === 4 && (
                        <StepAiSuggestions
                            suggestions={suggestions}
                            setFinal={setFinal}
                            onGenerate={() => {
                                setToast({ type: 'success', message: 'Suggestions generated!' });
                            }}
                        />
                    )}
                    {step === 5 && <StepFinalPreview final={final} setFinal={setFinal} />}

                    {/* Nav */}
                    <div className="mt-8 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={step === 1}
                            className="border-dark-muted/30 hover:bg-light-muted cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition disabled:opacity-50"
                        >
                            Back
                        </button>

                        {step <= STEPS.length && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary-intense cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition"
                            >
                                Next
                            </button>
                        )}

                        {/* {step === STEPS.length && (
                            <button
                                type="button"
                                onClick={() => {
                                    console.log();
                                    setToast({
                                        type: 'success',
                                        message: 'All set! You can export to PDF.',
                                    });
                                }}
                                className="bg-accent hover:bg-accent-intense cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition"
                            >
                                Finish
                            </button>
                        )} */}
                    </div>
                </div>
            </section>
        </main>
    );
}
