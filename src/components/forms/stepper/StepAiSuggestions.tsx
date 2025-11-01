import {
    AchievementTypeZod,
    EducationTypeZod,
    ExperienceTypeZod,
    ProjectTypeZod,
    ResumeDataTypeZod,
    SuggestionsType,
} from '@/data/constants/types';
import { Dispatch, SetStateAction, useState } from 'react';

export default function StepAiSuggestions({
    suggestions,
    setFinal,
    onGenerate,
}: {
    suggestions: SuggestionsType | null;
    setFinal: Dispatch<SetStateAction<ResumeDataTypeZod>>;
    onGenerate: () => void;
}) {
    const [selected, setSelected] = useState<{ [section: string]: string[] }>({});

    function resumeUserDataUpdator<SectionType>(
        prev: ResumeDataTypeZod,
        sectionKey: keyof ResumeDataTypeZod,
        section: SectionType[],
        ind: number,
        key: keyof SectionType,
        value: SectionType[keyof SectionType]
    ): ResumeDataTypeZod {
        const updated = section.map((item, i) => (i === ind ? { ...item, [key]: value } : item));

        return { ...prev, [sectionKey]: updated };
    }

    const updateFinal = (section: string, value: string, ind: number) => {
        switch (section) {
            case 'summary':
                setFinal((prev) => ({ ...prev, summary: value }));
                break;
            case 'experience':
                setFinal((prev) => {
                    if (!prev.experience) return prev;
                    return resumeUserDataUpdator<ExperienceTypeZod>(
                        prev,
                        'experience', // section key
                        prev.experience, // section array
                        ind,
                        'description',
                        value
                    );
                });
                break;
            case 'projects':
                setFinal((prev) => {
                    if (!prev.project) return prev;
                    return resumeUserDataUpdator<ProjectTypeZod>(
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
                    resumeUserDataUpdator<EducationTypeZod>(
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
                    return resumeUserDataUpdator<AchievementTypeZod>(
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
                <h2 className="text-2xl font-semibold tracking-tight">AI Suggestions</h2>

                {/* Loop through each section */}
                {Object.entries(suggestions).map(([section, options], ind) => (
                    <div key={section} className="space-y-4">
                        <h3 className="text-lg font-medium capitalize">{section}</h3>
                        <div className="flex flex-col gap-4">
                            {options.length === 0 ? (
                                <div
                                    className="border-dark-muted/50 flex aspect-[4/1] w-full items-center justify-center rounded-4xl border-2 border-dashed capitalize"
                                    style={{ height: 'fit-content' }}
                                    key={ind}
                                >
                                    Empty {section} Section
                                </div>
                            ) : (
                                options.map((opt, idx) => (
                                    <div
                                        className="grid h-fit grid-cols-[10px_1fr_1fr] gap-4"
                                        style={{ height: 'fit-content' }}
                                        key={idx}
                                    >
                                        <p>{idx + 1}</p>
                                        <div
                                            className={`h-fit rounded-2xl border p-4 shadow-sm transition ${
                                                Object.keys(selected).includes(section) &&
                                                selected[section][idx] === opt.option1
                                                    ? 'border-secondary'
                                                    : 'border-light bg-light-muted'
                                            }`}
                                        >
                                            {Object.keys(selected).includes(section) &&
                                                selected[section][idx] === opt.option1 && (
                                                    <span className="border-dark-muted/45 bg-light text-dark inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                                                        Selected
                                                    </span>
                                                )}
                                            <p className="text-dark my-2 text-sm font-medium text-wrap whitespace-pre-wrap">
                                                {opt.option1}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    className="border-secondary-muted text-dark shadow-secoborder-secondary-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-95"
                                                    onClick={() => {
                                                        updateFinal(section, opt.option1, idx);
                                                        setSelected((prev) => {
                                                            if (prev[section]) {
                                                                const updated = prev[section];
                                                                updated[idx] = opt.option1;
                                                                return {
                                                                    ...prev,
                                                                    [section]: updated,
                                                                };
                                                            } else {
                                                                return {
                                                                    ...prev,
                                                                    [section]: [opt.option1],
                                                                };
                                                            }
                                                        });
                                                    }}
                                                >
                                                    Use This
                                                </button>
                                                <button
                                                    className="border-dark-muted/30 hover:bg-light-muted shadow-dark-muted flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-xs transition hover:scale-95"
                                                    onClick={() =>
                                                        console.log('Edit clicked', section, opt)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className={`h-fit rounded-2xl border p-4 shadow-sm transition ${
                                                Object.keys(selected).includes(section) &&
                                                selected[section][idx] === opt.option2
                                                    ? 'border-secondary'
                                                    : 'border-light bg-light-muted'
                                            }`}
                                        >
                                            {Object.keys(selected).includes(section) &&
                                                selected[section][idx] === opt.option2 && (
                                                    <span className="border-dark-muted/45 bg-light text-dark inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                                                        Selected
                                                    </span>
                                                )}
                                            <p className="text-dark my-2 text-sm font-medium text-wrap whitespace-pre-wrap">
                                                {opt.option2}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    className="border-secondary-muted text-dark shadow-secoborder-secondary-muted flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-medium shadow-sm transition hover:scale-95"
                                                    onClick={() => {
                                                        updateFinal(section, opt.option2, idx);
                                                        setSelected((prev) => {
                                                            if (prev[section]) {
                                                                const updated = prev[section];
                                                                updated[idx] = opt.option2;
                                                                return {
                                                                    ...prev,
                                                                    [section]: updated,
                                                                };
                                                            } else {
                                                                return {
                                                                    ...prev,
                                                                    [section]: [opt.option2],
                                                                };
                                                            }
                                                        });
                                                    }}
                                                >
                                                    Use This
                                                </button>
                                                <button
                                                    className="border-dark-muted/30 hover:bg-light-muted shadow-dark-muted flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-xs transition hover:scale-95"
                                                    onClick={() =>
                                                        console.log('Edit clicked', section, opt)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
}
