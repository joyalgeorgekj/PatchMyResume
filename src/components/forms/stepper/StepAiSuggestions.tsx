import { ResumeDataType, SuggestionsType } from '@/data/constants/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function StepAiSuggestions({
    suggestions,
    setSuggestions,
    onGenerate,
}: {
    suggestions: SuggestionsType | null;
    setSuggestions: Dispatch<SetStateAction<ResumeDataType>>;
    onGenerate: () => void;
}) {
    const [selected, setSelected] = useState<{ section: string; option: string } | null>(null);
    useEffect(()=> {
        console.log(suggestions);
    })
    
    if (suggestions)
        return (
            <div className="space-y-10">
                <h2 className="text-2xl font-semibold tracking-tight">✨ AI Suggestions</h2>

                {/* Loop through each section */}
                {Object.entries(suggestions).map(([section, options]) => (
                    <div key={section} className="space-y-4">
                        <h3 className="text-lg font-medium capitalize">{section}</h3>
                        <div className="flex flex-col gap-4">
                            {options.map((opt, idx) => (
                                <div className="flex gap-4 h-fit" style={{height: 'fit-content'}} key={idx}>
                                    <p>{idx + 1}</p>
                                    <div
                                        key={`${section}-${idx}`}
                                        className={`rounded-2xl h-fit border p-4 shadow-sm transition ${
                                            selected?.section === section &&
                                            selected?.option === opt.option1
                                                ? 'border-secondary bg-secondary-muted/50'
                                                : 'border-light bg-light-muted'
                                        }`}
                                    >
                                        <p className="text-dark mb-2 text-sm font-medium whitespace-pre-wrap text-wrap">
                                            {opt.option1}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                className="border-secondary-muted text-dark shadow-secoborder-secondary-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105"
                                                onClick={() =>
                                                    setSelected({ section, option: opt.option1 })
                                                }
                                            >
                                                Use This
                                            </button>
                                            <button
                                                className="border-dark-muted/30 hover:bg-light-muted shadow-dark-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105"
                                                onClick={() =>
                                                    console.log('Edit clicked', section, opt)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        key={`${section}-${idx + 1}`}
                                        className={`rounded-2xl h-fit border p-4 shadow-sm transition ${
                                            selected?.section === section &&
                                            selected?.option === opt.option2
                                                ? 'border-secondary bg-secondary-muted/50'
                                                : 'border-light bg-light-muted'
                                        }`}
                                    >
                                        <p className="text-dark mb-2 text-sm font-medium whitespace-pre-wrap text-wrap">
                                            {opt.option2}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                className="border-secondary-muted text-dark shadow-secoborder-secondary-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105"
                                                onClick={() =>
                                                    setSelected({ section, option: opt.option2 })
                                                }
                                            >
                                                Use This
                                            </button>
                                            <button
                                                className="border-dark-muted/30 hover:bg-light-muted shadow-dark-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-105"
                                                onClick={() =>
                                                    console.log('Edit clicked', section, opt)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
}
