import { useUI } from '@/context/UIContext';
import { ResumeDataType, SuggestionsType } from '@/data/constants/types';
import { useEffect, useState } from 'react';
import StepApiModel from './StepApiModel';
import StepResumeData from './StepResumeData';
import StepJobDescription from './StepJobDescription';
import StepFinalPreview from './StepFinalPreview';
import StepAiSuggestions from './StepAiSuggestions';
import { createNewUserDocument, getUserDocument } from '@/lib/appwrite';
import { getResumeSuggestions } from '@/lib/ai';
import { ExampleResume } from '@/data/examples/resume';
import { JobDescription } from '@/data/examples/jobDescription';
import { STEPS } from '@/data/constants/workflow';
import { SUGGESTION } from '@/data/examples/suggestion';

export type AiDataType = {
    API_KEY: string;
    Model: string;
};

export default function Main() {
    const { setToast, setLoader } = useUI();
    const [step, setStep] = useState<number>(1);
    // data to be collected
    // Api Model
    const [aiApiModel, setAiApiModel] = useState<AiDataType>({
        API_KEY: '',
        Model: 'gemini-1.5-flash',
    });
    // Resume Data
    const [resumeUserData, setResumeUserData] = useState<ResumeDataType>(ExampleResume);
    // Job Description
    const [jobDescription, setJobDescription] = useState<string>(JobDescription);
    // AI
    const [suggestions, setSuggestions] = useState<SuggestionsType | null>(null);
    // Preview
    const [final, setFinal] = useState<ResumeDataType>(resumeUserData);

    // form control
    const prevStep = () => {
        setStep((prev) => prev - 1);
    };
    const nextStep = () => {
        switch (step) {
            case 1:
                aiApiModel.API_KEY !== '' && aiApiModel.Model !== ''
                    ? setStep((prev) => (prev < STEPS.length ? prev + 1 : prev))
                    : setToast({ type: 'error', message: 'API Key and Model is Required' });
                break;
            case 2:
                if (resumeUserData) {
                    createNewUserDocument({
                        resume_user_data: resumeUserData,
                        api_key: aiApiModel.API_KEY,
                        model: aiApiModel.Model,
                    }).then((res) =>
                        setToast({ message: 'Message from Step 2' + res.message, type: res.type })
                    );
                }
                resumeUserData
                    ? setStep((prev) => (prev < STEPS.length ? prev + 1 : prev))
                    : setToast({ type: 'error', message: 'Resume Data is Required' });
                break;
            case 3:
                if (jobDescription !== '') {
                    setLoader({ message: 'Formatting data', active: true });

                    // Step 1: call AI suggestions
                    getResumeSuggestions(jobDescription)
                        .then(async (res) => {
                            // Update loader stages in sequence
                            setLoader({ active: true, message: 'Sending data to AI' });
                            await new Promise((r) => setTimeout(r, 1000));

                            setLoader({ active: true, message: 'AI Processing Data' });
                            await new Promise((r) => setTimeout(r, 1500));

                            setLoader({ active: true, message: 'Creating Suggestions' });
                            await new Promise((r) => setTimeout(r, 1500));

                            // Done → update UI
                            setSuggestions(res);
                            setToast({ message: 'Suggestion has been updated', type: 'success' });
                            setStep((prev) => (prev < STEPS.length ? prev + 1 : prev));
                        })
                        .catch(() => {
                            setToast({ type: 'error', message: 'Failed to fetch suggestions' });
                        })
                        .finally(() => {
                            setLoader({ active: false });
                        });
                } else {
                    setToast({ type: 'error', message: 'Job Description is Required' });
                }
                break;
            case 4:
                suggestions
                    ? setStep((prev) => (prev < STEPS.length ? prev + 1 : prev))
                    : setToast({ type: 'error', message: 'Pick Suggestions' });
                break;
            case 5:
                resumeUserData
                    ? setStep((prev) => (prev < STEPS.length ? prev + 1 : prev))
                    : setToast({ type: 'success', message: 'Data Successfully Extracted' });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getUserDocument().then((res) => {
            if (res.model && res.api_key) setAiApiModel({ Model: res.model, API_KEY: res.api_key });
            if (res.resume_user_data) setResumeUserData(res.resume_user_data);
        });
    }, []);

    useEffect(() => {
        console.log('API and Model: ', aiApiModel);
    }, [aiApiModel]);

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
                    <ol className="flex items-center justify-between">
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
                            jobDescription={jobDescription}
                            setJobDescription={setJobDescription}
                        />
                    )}
                    {step === 4 && (
                        <StepAiSuggestions
                            suggestions={suggestions}
                            setSuggestions={setResumeUserData}
                            onGenerate={() => {
                                setToast({ type: 'success', message: 'Suggestions generated!' });
                            }}
                        />
                    )}
                    {step === 5 && <StepFinalPreview />}

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

                        {step < STEPS.length && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary-intense cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition"
                            >
                                Next
                            </button>
                        )}

                        {step === STEPS.length && (
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
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
