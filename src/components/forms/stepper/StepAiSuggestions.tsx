import {
    AchievementType,
    EducationType,
    ExperienceType,
    ProjectType,
    ResumeDataType,
    SuggestionsType,
} from '@/data/constants/types';
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
    useEffect(() => {
        console.log(selected);
    });

    function resumeUserDataUpdator<SectionType>(
        prev: ResumeDataType,
        sectionKey: keyof ResumeDataType,
        section: SectionType[],
        ind: number,
        key: keyof SectionType,
        value: SectionType[keyof SectionType]
    ): ResumeDataType {
        const updated = section.map((item, i) => (i === ind ? { ...item, [key]: value } : item));

        return { ...prev, [sectionKey]: updated };
    }

    const updateFinal = (section: string, value: string, ind: number) => {
        switch (section) {
            case 'summary':
                setFinal((prev) => ({ ...prev, summary: value }));
                break;
            case 'experience':
                setFinal((prev) =>
                    resumeUserDataUpdator<ExperienceType>(
                        prev,
                        'experience', // section key
                        prev.experience, // section array
                        ind,
                        'description',
                        value
                    )
                );
                break;
            case 'projects':
                setFinal((prev) => {
                    if (!prev.project) return prev;
                    return resumeUserDataUpdator<ProjectType>(
                        prev,
                        'project', // section key
                        prev.project, // section array
                        ind,
                        'description',
                        value
                    );
                });
                break;
            case 'skills':
                setFinal((prev) => ({
                    ...prev,
                    skills: value.split(', '),
                }));
                break;
            case 'education':
                setFinal((prev) =>
                    resumeUserDataUpdator<EducationType>(
                        prev,
                        'education', // section key
                        prev.education, // section array
                        ind,
                        'description',
                        value
                    )
                );
                break;
            case 'achievement':
                setFinal((prev) => {
                    if (!prev.achievement) return prev;
                    return resumeUserDataUpdator<AchievementType>(
                        prev,
                        'achievement', // section key
                        prev.achievement, // section array
                        ind,
                        'description',
                        value
                    );
                });
                break;
            default:
                break;
        }
    };

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
                                <div
                                    className="flex h-fit gap-4"
                                    style={{ height: 'fit-content' }}
                                    key={idx}
                                >
                                    <p>{idx + 1}</p>
                                    <div
                                        key={`${section}-${idx}`}
                                        className={`h-fit rounded-2xl border p-4 shadow-sm transition ${
                                            selected?.section === section &&
                                            selected?.option === opt.option1
                                                ? 'border-secondary bg-secondary-muted/50'
                                                : 'border-light bg-light-muted'
                                        }`}
                                    >
                                        <p className="text-dark mb-2 text-sm font-medium text-wrap whitespace-pre-wrap">
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
                                        className={`h-fit rounded-2xl border p-4 shadow-sm transition ${
                                            selected?.section === section &&
                                            selected?.option === opt.option2
                                                ? 'border-secondary bg-secondary-muted/50'
                                                : 'border-light bg-light-muted'
                                        }`}
                                    >
                                        <p className="text-dark mb-2 text-sm font-medium text-wrap whitespace-pre-wrap">
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
