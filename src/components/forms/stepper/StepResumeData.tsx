'use client';

import { useUI } from '@/context/UIContext';
import {
    AchievementTypeZod,
    EducationTypeZod,
    ExperienceTypeZod,
    LanguageTypeZod,
    LinkTypeZod,
    ProjectTypeZod,
    ResumeDataTypeZod,
} from '@/data/constants/types';
import { Dispatch, SetStateAction, useState } from 'react';
import JsonEditor from '../JsonEditor';

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

export default function StepResumeData({
    resumeUserData,
    setResumeUserData,
}: {
    resumeUserData: ResumeDataTypeZod;
    setResumeUserData: Dispatch<SetStateAction<ResumeDataTypeZod>>;
}) {
    const { setToast } = useUI();
    const [mode, setMode] = useState<'json' | 'form'>('form');

    return (
        <form className="space-y-10">
            {/* Tabs */}
            <div className="border-dark-muted/15 mt-6 flex rounded-lg border p-1 text-sm">
                <button
                    type="button"
                    onClick={() => setMode('form')}
                    className={[
                        'flex-1 rounded-md px-3 py-2 transition',
                        mode === 'form' ? 'bg-primary text-white' : 'hover:bg-light-muted',
                    ].join(' ')}
                >
                    Form
                </button>
                <button
                    type="button"
                    onClick={() => setMode('json')}
                    className={[
                        'flex-1 rounded-md px-3 py-2 transition',
                        mode === 'json' ? 'bg-primary text-white' : 'hover:bg-light-muted',
                    ].join(' ')}
                >
                    JSON
                </button>
            </div>
            {mode === 'form' ? (
                <div>
                    {/* ========== BASIC INFO ========== */}
                    <section>
                        <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    onChange={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    required
                                    value={resumeUserData.name}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">Email *</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                    value={resumeUserData.email}
                                    onChange={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">Phone *</label>
                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    required
                                    value={resumeUserData.phone}
                                    onChange={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium">Location *</label>
                                <input
                                    type="text"
                                    placeholder="Enter location"
                                    required
                                    value={resumeUserData.location}
                                    onChange={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            location: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ========== LINKS ========== */}
                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Links</h2>
                        <div className="space-y-3">
                            {resumeUserData.links.map((val, ind) => (
                                <div
                                    className={
                                        'border-light-muted mobile:flex-row flex gap-3 rounded-lg border p-4 shadow-sm'
                                    }
                                    key={ind}
                                >
                                    <select
                                        defaultValue={val.platform}
                                                resumeUserDataUpdator<LinkTypeZod>(
                                        type="url"
                                        placeholder="Enter URL"
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<LinkType>(
                                                    prev,
                                                    'links', // section key
                                                    prev.links, // section array
                                                    ind,
                                                    'url',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        value={val.url ? val.url : ''}
                                    />
                                    <button
                                        type="button"
                                        className="rounded-md border border-red-500 px-3 py-2 text-sm text-red-600 transition hover:scale-105"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Link
                            </button>
                        </div>
                    </section>

                    {/* ========== SUMMARY ========== */}
                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Summary</h2>
                        <textarea
                            wrap="hard"
                            rows={5}
                            minLength={50}
                            maxLength={500}
                            value={resumeUserData.summary}
                            onChange={(e) =>
                                setResumeUserData((prev) => ({ ...prev, summary: e.target.value }))
                            }
                            placeholder="Write a short summary about yourself..."
                            required
                            className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                        ></textarea>
                        <p className="text-dark-muted mt-1 text-xs">Min 50 chars, Max 500 chars</p>
                    </section>

                    {/* ========== SKILLS ========== */}
                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Skills *</h2>
                        <div className="mb-4 flex flex-wrap gap-4">
                            {resumeUserData.skills?.map((skill, index) => (
                                <span
                                    className="shadow-dark-muted/15 cursor-pointer rounded-xs px-2 py-0 text-xs shadow-xs"
                                    key={index}
                                    onClick={(e) => {
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            skills: prev.skills.filter(
                                                (val, ind) => index !== ind && val !== ''
                                            ),
                                        }));

                                        setToast({
                                            type: 'info',
                                            message: `Removed Skill: ${e.currentTarget.innerText}`,
                                        });
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Enter skills (comma separated)"
                            value={resumeUserData.skills?.join(', ')}
                            onChange={(e) =>
                                setResumeUserData((prev) => ({
                                    ...prev,
                                    skills: e.target.value.split(', '),
                                }))
                            }
                            required
                            className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                        />
                        <p className="text-dark-muted mt-3 text-xs">
                            Tip: Click on skill tags to remove skill
                        </p>
                    </section>

                    {/* ========== EXPERIENCE ========== */}
                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Experience</h2>
                        <div className="space-y-4">
                            {resumeUserData.experience?.map((val, ind) => (
                                <div
                                    className="border-light-muted space-y-3 rounded-lg border p-4 shadow-sm"
                                    key={ind}
                                >
                                    <input
                                        placeholder="Company"
                                        value={val.company}
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<ExperienceType>(
                                                    prev,
                                                    'experience', // section key
                                                    prev.experience, // section array
                                                    ind,
                                                    'company',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <input
                                        placeholder="Job Title"
                                        value={val.title}
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<ExperienceType>(
                                                    prev,
                                                    'experience', // section key
                                                    prev.experience, // section array
                                                    ind,
                                                    'title',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <textarea
                                        wrap="hard"
                                        placeholder="Responsibilities (one per line)"
                                        rows={3}
                                        value={val.description}
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<ExperienceType>(
                                                    prev,
                                                    'experience', // section key
                                                    prev.experience, // section array
                                                    ind,
                                                    'description',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm whitespace-pre focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Experience
                            </button>
                        </div>
                    </section>

                    {/* ========== PROJECTS, EDUCATION, CERTIFICATIONS, AWARDS, LANGUAGES, PUBLICATIONS ========== */}
                    {/* Repeat same pattern as Experience → card + Add button */}

                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Education</h2>
                        <div className="space-y-4">
                            {resumeUserData.education?.map((val, ind) => (
                                <div
                                    className="border-light-muted space-y-3 rounded-lg border p-4 shadow-sm"
                                    key={ind}
                                >
                                    <input
                                        placeholder="Institute"
                                        value={val.institute}
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<EducationTypeZod>(
                                                    prev,
                                                    'education', // section key
                                                    prev.education, // section array
                                                    ind,
                                                    'institute',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <input
                                        placeholder="Course"
                                        value={val.course}
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<EducationTypeZod>(
                                                    prev,
                                                    'education', // section key
                                                    prev.education, // section array
                                                    ind,
                                                    'course',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <input
                                        placeholder="Location"
                                        value={val.location}
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<EducationTypeZod>(
                                                    prev,
                                                    'education', // section key
                                                    prev.education, // section array
                                                    ind,
                                                    'location',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <textarea
                                        wrap="hard"
                                        placeholder="Responsibilities (one per line)"
                                        rows={3}
                                        value={val.description || ''}
                                        onChange={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<EducationTypeZod>(
                                                    prev,
                                                    'education', // section key
                                                    prev.education, // section array
                                                    ind,
                                                    'description',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm whitespace-pre focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Education
                            </button>
                        </div>
                    </section>

                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Projects</h2>
                        <div className="space-y-4">
                            {resumeUserData.project?.map((val, ind) => (
                                <div
                                    className="border-light-muted space-y-3 rounded-lg border p-4 shadow-sm"
                                    key={ind}
                                >
                                    <input
                                        placeholder="Project Name"
                                        value={val.name}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.project) return prev;
                                                return resumeUserDataUpdator<ProjectTypeZod>(
                                                    prev,
                                                    'project', // section key
                                                    prev.project, // section array
                                                    ind,
                                                    'name',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <select
                                        defaultValue={val.type}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.project) return prev;
                                                return resumeUserDataUpdator<ProjectTypeZod>(
                                                    prev,
                                                    'project', // section key
                                                    prev.project, // section array
                                                    ind,
                                                    'type',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-ui-muted bg-light text-dark placeholder-dark-muted focus:border-primary-intense focus:ring-primary-intense w-full appearance-none rounded-lg border-2 px-4 py-2 pr-10 text-sm capitalize transition outline-none focus:ring-2"
                                    >
                                        <option value={'personal'}>personal</option>
                                        <option value={'academic'}>academic</option>
                                        <option value={'professional'}>professional</option>
                                        <option value={'open-source'}>open-source</option>
                                    </select>
                                    <input
                                        placeholder="Code Link"
                                        value={val.code_link}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.project) return prev;
                                                return resumeUserDataUpdator<ProjectTypeZod>(
                                                    prev,
                                                    'project', // section key
                                                    prev.project, // section array
                                                    ind,
                                                    'code_link',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <input
                                        placeholder="Preview Link"
                                        value={val.preview_link}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.project) return prev;
                                                return resumeUserDataUpdator<ProjectTypeZod>(
                                                    prev,
                                                    'project', // section key
                                                    prev.project, // section array
                                                    ind,
                                                    'preview_link',
                                                    e.target.value
                                                );
                                            })
                                        }
                                                return resumeUserDataUpdator<ProjectTypeZod>(
                                                    prev,
                                                    'project', // section key
                                                    prev.project, // section array
                                                    ind,
                                                    'description',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm whitespace-pre focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Project
                            </button>
                        </div>
                    </section>

                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Achievements</h2>
                        <div className="space-y-4">
                            {resumeUserData.achievement?.map((val, ind) => (
                                <div
                                    className="border-light-muted space-y-3 rounded-lg border p-4 shadow-sm"
                                    key={ind}
                                >
                                    <select
                                        defaultValue={val.type}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.achievement) return prev;
                                                return resumeUserDataUpdator<AchievementTypeZod>(
                                                    prev,
                                                    'achievement', // section key
                                                    prev.achievement, // section array
                                                    ind,
                                                    'type',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-ui-muted bg-light text-dark placeholder-dark-muted focus:border-primary-intense focus:ring-primary-intense w-full appearance-none rounded-lg border-2 px-4 py-2 pr-10 text-sm capitalize transition outline-none focus:ring-2"
                                    >
                                        <option value={'certificate'}>certificate</option>
                                        <option value={'award'}>award</option>
                                        <option value={'publication'}>publication</option>
                                        <option value={'honor'}>honor</option>
                                        <option value={'scholarship'}>scholarship</option>
                                        <option value={'other'}>other</option>
                                    </select>
                                    <input
                                        placeholder="Project Name"
                                        value={val.name}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.achievement) return prev;
                                                return resumeUserDataUpdator<AchievementTypeZod>(
                                                    prev,
                                                    'achievement', // section key
                                                    prev.achievement, // section array
                                                    ind,
                                                    'name',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <input
                                        placeholder="Code Link"
                                        value={val.issuer}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.achievement) return prev;
                                                return resumeUserDataUpdator<AchievementTypeZod>(
                                                    prev,
                                                    'achievement', // section key
                                                    prev.achievement, // section array
                                                    ind,
                                                    'issuer',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <input
                                        placeholder="Preview Link"
                                        value={val.url}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.achievement) return prev;
                                                return resumeUserDataUpdator<AchievementTypeZod>(
                                                    prev,
                                                    'achievement', // section key
                                                    prev.achievement, // section array
                                                    ind,
                                                    'url',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <textarea
                                        wrap="hard"
                                        placeholder="Responsibilities (one per line)"
                                        rows={3}
                                        value={val.description}
                                        onChange={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.achievement) return prev;
                                                return resumeUserDataUpdator<AchievementTypeZod>(
                                                    prev,
                                                    'achievement', // section key
                                                    prev.achievement, // section array
                                                    ind,
                                                    'description',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm whitespace-pre focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Achievements
                            </button>
                        </div>
                    </section>

                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Language</h2>
                        <div className="space-y-4">
                            {resumeUserData.language?.map((val, ind) => (
                                <div
                                    className="border-light-muted space-y-3 rounded-lg border p-4 shadow-sm"
                                    key={ind}
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <select
                                            defaultValue={val.proficiency}
                                            onChange={(e) =>
                                                setResumeUserData((prev) => {
                                                    if (!prev.achievement) return prev;
                                                    return resumeUserDataUpdator<LanguageTypeZod>(
                                                        prev,
                                                        'language', // section key
                                                        prev.language, // section array
                                                        ind,
                                                        'proficiency',
                                                        e.target.value
                                                    );
                                                })
                                            }
                                            className="border-ui-muted bg-light text-dark placeholder-dark-muted focus:border-primary-intense focus:ring-primary-intense w-full appearance-none rounded-lg border-2 px-4 py-2 pr-10 text-sm capitalize transition outline-none focus:ring-2"
                                        >
                                            <option value={'native'}>native</option>
                                            <option value={'fluent'}>fluent</option>
                                            <option value={'professional'}>professional</option>
                                            <option value={'intermediate'}>intermediate</option>
                                            <option value={'basic'}>basic</option>
                                        </select>
                                        <input
                                            placeholder="Preview Link"
                                            value={val.language}
                                            onChange={(e) =>
                                                setResumeUserData((prev) => {
                                                    if (!prev.language) return prev;
                                                    return resumeUserDataUpdator<LanguageTypeZod>(
                                                        prev,
                                                        'language', // section key
                                                        prev.language, // section array
                                                        ind,
                                                        'language',
                                                        e.target.value
                                                    );
                                                })
                                            }
                                            className="border-light-muted w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Achievements
                            </button>
                        </div>
                    </section>
                </div>
            ) : (
                <JsonEditor resumeUserData={resumeUserData} setResumeUserData={setResumeUserData} />
            )}
        </form>
    );
}
