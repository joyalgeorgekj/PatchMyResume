import { useUI } from '@/context/UIContext';
import { ResumeDataType } from '@/data/constants/types';
import { ExampleResume, STEPS } from '@/data/constants/variables';
import { useEffect, useMemo, useState } from 'react';
import StepApiModel from './StepApiModel';
import StepResumeData from './StepResumeData';
import StepJobDescription from './StepJobDescription';
import StepFinalPreview from './StepFinalPreview';
import StepAiSuggestions from './StepAiSuggestions';

export type AiDataType = {
    API_KEY: string;
    Model: string;
};

export default function Main() {
    const { setToast } = useUI();
    const [step, setStep] = useState<number>(1);
    // data to be collected
    // Api Model
    const [aiApiModel, setAiApiModel] = useState<AiDataType>({
        API_KEY: 'testn09nlk',
        Model: 'gemini-1.5-flash',
    });
    // Resume Data
    const [resumeUserData, setResumeUserData] = useState<ResumeDataType>(ExampleResume);
    // Job Description
    const [jobDescription, setJobDescription] = useState<string>('');
    // AI
    const [suggestions, setSuggestions] = useState({});
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
                resumeUserData
                    ? setStep((prev) => (prev < STEPS.length ? prev + 1 : prev))
                    : setToast({ type: 'error', message: 'Resume Data is Required' });
                break;
            case 3:
                jobDescription !== ''
                    ? setStep((prev) => (prev < STEPS.length ? prev + 1 : prev))
                    : setToast({ type: 'error', message: 'Job Description is Required' });
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
        nextStep();
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
        console.log('AI Suggestions', suggestions);
    }, [suggestions]);
    
    useEffect(() => {
        console.log('Final Resume Data', final);
    }, [final]);

    return (
        <main aria-label="Resume Builder" className="bg-light text-dark">
            {/* Progress */}
            <section className="mx-auto max-w-5xl px-6 pt-8">
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
            <section className="mx-auto max-w-5xl px-6 pb-12">
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
                            className="border-dark-muted/30 hover:bg-light-muted rounded-lg border px-4 py-2 text-sm font-medium transition disabled:opacity-50"
                        >
                            Back
                        </button>

                        {step < STEPS.length && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-primary hover:bg-primary-intense rounded-lg px-4 py-2 text-sm font-medium text-white transition"
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
                                className="bg-accent hover:bg-accent-intense rounded-lg px-4 py-2 text-sm font-medium text-white transition"
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
