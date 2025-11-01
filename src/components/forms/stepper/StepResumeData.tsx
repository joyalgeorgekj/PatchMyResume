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
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import JsonEditor from '../JsonEditor';
import Select from '@/components/ui/form/Select';
import Input from '@/components/ui/form/Input';
import Textarea from '@/components/ui/form/Textarea';
import DateRangePicker from '@/components/ui/form/DatePicker';
import ArrayInput from '@/components/ui/form/ArrayInput';

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

function resumeUserDataRemover(
    prev: ResumeDataTypeZod,
    section: keyof ResumeDataTypeZod,
    ind: number
): ResumeDataTypeZod {
    if (Array.isArray(prev[section]) && prev[section]) {
        const updated = prev[section];
        return {
            ...prev,
            [section]: updated.filter((_, index) => index !== ind),
        };
    }
    return prev;
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
                                <label className="mb-1 block text-sm font-medium" htmlFor="name">
                                    Name *
                                </label>
                                <Input
                                    keyboard="text"
                                    seoedId={'name'}
                                    defaultValue={resumeUserData.name}
                                    id="name"
                                    required={true}
                                    updator={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium" htmlFor="email">
                                    Email *
                                </label>
                                <Input
                                    keyboard="email"
                                    seoedId={'email'}
                                    defaultValue={resumeUserData.email}
                                    id="email"
                                    type="email"
                                    required={true}
                                    updator={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="phone_number"
                                >
                                    Phone *
                                </label>
                                <Input
                                    seoedId={'phone_number'}
                                    type="tel"
                                    keyboard="tel"
                                    id="phone number"
                                    required={true}
                                    defaultValue={resumeUserData.phone}
                                    updator={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="location"
                                >
                                    Location *
                                </label>
                                <Input
                                    seoedId={'location'}
                                    id="location"
                                    required
                                    defaultValue={resumeUserData.location}
                                    updator={(e) =>
                                        setResumeUserData((prev) => ({
                                            ...prev,
                                            location: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* ========== LINKS ========== */}
                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Links*</h2>
                        <div className="space-y-3">
                            {resumeUserData.links.map((val, ind) => (
                                <div
                                    className={
                                        'border-light-muted flex flex-col gap-3 rounded-lg border p-4 shadow-sm md:flex-row'
                                    }
                                    key={ind}
                                >
                                    <Select
                                        id={'platform_' + ind}
                                        defaultValue={val.platform}
                                        updator={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<LinkTypeZod>(
                                                    prev,
                                                    'links', // section key
                                                    prev.links, // section array
                                                    ind,
                                                    'platform',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        options={[
                                            'github',
                                            'linkedin',
                                            'portfolio',
                                            'twitter',
                                            'dribbble',
                                            'behance',
                                            'other',
                                        ]}
                                    />
                                    <Input
                                        seoedId={val.platform + '_url_' + ind}
                                        type="url"
                                        id="URL"
                                        keyboard="url"
                                        updator={(e) =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataUpdator<LinkTypeZod>(
                                                    prev,
                                                    'links', // section key
                                                    prev.links, // section array
                                                    ind,
                                                    'url',
                                                    e.target.value
                                                )
                                            )
                                        }
                                        defaultValue={val.url ? val.url : ''}
                                    />
                                    <button
                                        onClick={() =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataRemover(prev, 'links', ind)
                                            )
                                        }
                                        type="button"
                                        className="rounded-md border border-red-500 px-3 py-2 text-sm text-red-600 transition hover:scale-105"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() =>
                                    setResumeUserData((prev) => ({
                                        ...prev,
                                        links: [
                                            ...prev.links,
                                            {
                                                platform: 'github',
                                                url: '',
                                            },
                                        ],
                                    }))
                                }
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Link
                            </button>
                        </div>
                    </section>

                    {/* ========== SUMMARY ========== */}
                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Summary*</h2>
                        <Textarea
                            id="summary"
                            rows={7}
                            defaultValue={resumeUserData.summary}
                            updator={(e) =>
                                setResumeUserData((prev) => ({ ...prev, summary: e.target.value }))
                            }
                            placeholder="Write a short summary about yourself..."
                            required
                        ></Textarea>
                        <p className="text-dark-muted mt-1 text-xs">Min 50 chars, Max 500 chars</p>
                    </section>

                    {/* ========== SKILLS ========== */}
                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Skills *</h2>
                        <div className="mb-4 flex flex-wrap gap-4">
                            {resumeUserData.skills?.map((skill, index) => (
                                <ArrayInput
                                    key={index}
                                    updator={(e) => {
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
                                    value={skill}
                                />
                            ))}
                        </div>
                        <Input
                            seoedId={'skills'}
                            type="text"
                            id="skills (comma separated)"
                            defaultValue={resumeUserData.skills?.join(', ')}
                            updator={(e) =>
                                setResumeUserData((prev) => ({
                                    ...prev,
                                    skills: e.target.value.split(', '),
                                }))
                            }
                            required
                        />
                        <p className="text-dark-muted mt-3 text-xs">
                            Tip: Click on skill tags to remove skill
                        </p>
                    </section>

                    {/* ========== PROJECTS, EDUCATION, CERTIFICATIONS, AWARDS, LANGUAGES, PUBLICATIONS ========== */}
                    {/* Repeat same pattern as Experience → card + Add button */}

                    <section className="border-dark-muted/25 mt-6 border-t pt-4">
                        <h2 className="mb-4 text-xl font-semibold">Education*</h2>
                        <div className="space-y-4">
                            {resumeUserData.education?.map((val, ind) => (
                                <div
                                    className="border-light-muted space-y-3 rounded-lg border p-4 shadow-sm"
                                    key={ind}
                                >
                                    <Input
                                        seoedId={'institute_' + ind}
                                        id="Institute"
                                        defaultValue={val.institute}
                                        updator={(e) =>
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
                                    />
                                    <Input
                                        seoedId={'course' + ind}
                                        id="Course"
                                        defaultValue={val.course}
                                        updator={(e) =>
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
                                    />
                                    <Input
                                        seoedId={'education_location_' + ind}
                                        id="Location"
                                        defaultValue={val.location}
                                        updator={(e) =>
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
                                    />
                                    <DateRangePicker
                                        start={true}
                                        current={true}
                                        end={true}
                                        uniqueSectionID={'education_date_' + ind}
                                    />
                                    <Textarea
                                        id={'education_description' + ind}
                                        defaultValue={val.description}
                                        updator={(e) =>
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
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        onClick={() =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataRemover(prev, 'education', ind)
                                            )
                                        }
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() =>
                                    setResumeUserData((prev) => ({
                                        ...prev,
                                        education: [
                                            ...prev.education,
                                            {
                                                institute: '',
                                                course: '',
                                                description: '',
                                                location: '',
                                                startDate: new Date(),
                                            },
                                        ],
                                    }))
                                }
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
                                    <Input
                                        seoedId={'project_name_' + ind}
                                        id="Project Name"
                                        defaultValue={val.name}
                                        updator={(e) =>
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
                                    />
                                    <Select
                                        id={'project_type_' + ind}
                                        options={[
                                            'personal',
                                            'academic',
                                            'professional',
                                            'open-source',
                                        ]}
                                        updator={(e) =>
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
                                        defaultValue={val.type}
                                    />
                                    <Input
                                        seoedId={'code_link_' + ind}
                                        id="Code Link"
                                        defaultValue={val.code_link}
                                        updator={(e) =>
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
                                    />
                                    <Input
                                        seoedId={'preview_link_' + ind}
                                        id="Preview Link"
                                        defaultValue={val.preview_link || ''}
                                        updator={(e) =>
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
                                    />
                                    <div
                                        className={
                                            val.tech_stack.length !== 0
                                                ? 'mb-4 flex flex-wrap gap-4'
                                                : 'hidden'
                                        }
                                    >
                                        {val.tech_stack.map((skill, index) => (
                                            <ArrayInput
                                                key={index}
                                                updator={(e) => {
                                                    setResumeUserData((prev) => {
                                                        if (!prev.project) return prev;
                                                        return resumeUserDataUpdator<ProjectTypeZod>(
                                                            prev,
                                                            'project', // section key
                                                            prev.project, // section array
                                                            ind,
                                                            'preview_link',
                                                            val.tech_stack.filter(
                                                                (val, ind) =>
                                                                    index !== ind && val !== ''
                                                            )
                                                        );
                                                    });

                                                    setToast({
                                                        type: 'info',
                                                        message: `Removed Skill: ${e.currentTarget.innerText}`,
                                                    });
                                                }}
                                                value={skill}
                                            />
                                        ))}
                                    </div>
                                    <Input
                                        seoedId={'project_techstack_' + ind}
                                        type="text"
                                        id="skills (comma separated)"
                                        defaultValue={val.tech_stack?.join(', ')}
                                        updator={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.project) return prev;

                                                console.log(e.target.value);

                                                const data = e.target.value.split(', ');
                                                return resumeUserDataUpdator<ProjectTypeZod>(
                                                    prev,
                                                    'project', // section key
                                                    prev.project, // section array
                                                    ind,
                                                    'tech_stack',
                                                    data
                                                );
                                            })
                                        }
                                        required
                                    />
                                    <p className="text-dark-muted mt-1 text-xs">
                                        Tip: Click on skill tags to remove skill
                                    </p>
                                    <Textarea
                                        id={'project_description_' + ind}
                                        defaultValue={val.description}
                                        updator={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.project) return prev;
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
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        onClick={() =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataRemover(prev, 'project', ind)
                                            )
                                        }
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() =>
                                    setResumeUserData((prev) => {
                                        if (prev.project === undefined)
                                            return {
                                                ...prev,
                                                project: [
                                                    {
                                                        name: '',
                                                        description: '',
                                                        code_link: '',
                                                        tech_stack: [],
                                                        type: 'personal',
                                                    },
                                                ],
                                            };
                                        return {
                                            ...prev,
                                            project: [
                                                ...prev.project,
                                                {
                                                    name: '',
                                                    description: '',
                                                    code_link: '',
                                                    tech_stack: [],
                                                    type: 'personal',
                                                },
                                            ],
                                        };
                                    })
                                }
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Project
                            </button>
                        </div>
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
                                    <Input
                                        seoedId={'company_name_' + ind}
                                        id="Company"
                                        defaultValue={val.company}
                                        updator={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.experience) return prev;
                                                return resumeUserDataUpdator<ExperienceTypeZod>(
                                                    prev,
                                                    'experience', // section key
                                                    prev.experience, // section array
                                                    ind,
                                                    'company',
                                                    e.target.value
                                                );
                                            })
                                        }
                                    />
                                    <Select
                                        id={'experience_type_' + ind}
                                        updator={(e: ChangeEvent<HTMLSelectElement>) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.experience) return prev;
                                                return resumeUserDataUpdator<ExperienceTypeZod>(
                                                    prev,
                                                    'experience', // section key
                                                    prev.experience, // section array
                                                    ind,
                                                    'workType',
                                                    e.target.value
                                                );
                                            })
                                        }
                                        defaultValue={val.workType}
                                        options={['regular', 'freelance', 'volunteer']}
                                    />
                                    <Input
                                        seoedId={'job_title_' + ind}
                                        id="Job Title"
                                        defaultValue={val.title}
                                        updator={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.experience) return prev;
                                                return resumeUserDataUpdator<ExperienceTypeZod>(
                                                    prev,
                                                    'experience', // section key
                                                    prev.experience, // section array
                                                    ind,
                                                    'title',
                                                    e.target.value
                                                );
                                            })
                                        }
                                    />
                                    <DateRangePicker
                                        start={true}
                                        current={true}
                                        end={true}
                                        uniqueSectionID={'experience_date_' + ind}
                                    />
                                    <Textarea
                                        id={'experience_description_' + ind}
                                        defaultValue={val.description}
                                        updator={(e) =>
                                            setResumeUserData((prev) => {
                                                if (!prev.experience) return prev;
                                                return resumeUserDataUpdator<ExperienceTypeZod>(
                                                    prev,
                                                    'experience', // section key
                                                    prev.experience, // section array
                                                    ind,
                                                    'description',
                                                    e.target.value
                                                );
                                            })
                                        }
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        onClick={() =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataRemover(prev, 'experience', ind)
                                            )
                                        }
                                        type="button"
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() =>
                                    setResumeUserData((prev) => {
                                        if (prev.experience === undefined)
                                            return {
                                                ...prev,
                                                experience: [
                                                    {
                                                        company: '',
                                                        description: '',
                                                        location: '',
                                                        startDate: new Date(),
                                                        title: '',
                                                        workType: 'regular',
                                                    },
                                                ],
                                            };
                                        return {
                                            ...prev,
                                            experience: [
                                                ...prev.experience,
                                                {
                                                    company: '',
                                                    description: '',
                                                    location: '',
                                                    startDate: new Date(),
                                                    title: '',
                                                    workType: 'regular',
                                                },
                                            ],
                                        };
                                    })
                                }
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Experience
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
                                    <Select
                                        id={'achievement_type_' + ind}
                                        options={[
                                            'certificate',
                                            'award',
                                            'publication',
                                            'honor',
                                            'scholarship',
                                            'other',
                                        ]}
                                        defaultValue={val.type}
                                        updator={(e) =>
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
                                    />
                                    <Input
                                        seoedId={'achievement_name_' + ind}
                                        id="Achievement Name"
                                        defaultValue={val.name}
                                        updator={(e) =>
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
                                    />
                                    <Input
                                        seoedId={'issuer_' + ind}
                                        id="Issuer"
                                        defaultValue={val.issuer}
                                        updator={(e) =>
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
                                    />
                                    <Input
                                        seoedId={'url_' + ind}
                                        id="URL"
                                        defaultValue={val.url || ''}
                                        updator={(e) =>
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
                                    />
                                    <DateRangePicker
                                        start={true}
                                        uniqueSectionID={'achievement_date_' + ind}
                                    />
                                    <Textarea
                                        id={'achievement_description' + ind}
                                        defaultValue={val.description}
                                        updator={(e) =>
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
                                    />
                                    <p className="text-dark-muted text-xs">
                                        Tip: Use{' '}
                                        <code className="bg-light-muted text-dark-intense p-1">{`[Enter][Dash][Space]`}</code>{' '}
                                        to make the sentence a bullet-point
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataRemover(prev, 'achievement', ind)
                                            )
                                        }
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() =>
                                    setResumeUserData((prev) => {
                                        if (prev.achievement === undefined)
                                            return {
                                                ...prev,
                                                achievement: [
                                                    {
                                                        url: '',
                                                        issuer: '',
                                                        description: '',
                                                        name: '',
                                                        startDate: new Date(),
                                                        type: 'certificate',
                                                    },
                                                ],
                                            };
                                        return {
                                            ...prev,
                                            achievement: [
                                                ...prev.achievement,
                                                {
                                                    url: '',
                                                    issuer: '',
                                                    description: '',
                                                    name: '',
                                                    startDate: new Date(),
                                                    type: 'certificate',
                                                },
                                            ],
                                        };
                                    })
                                }
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
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Select
                                            id={'proficiency_' + ind}
                                            options={[
                                                'native',
                                                'fluent',
                                                'professional',
                                                'intermediate',
                                                'basic',
                                            ]}
                                            defaultValue={val.proficiency}
                                            updator={(e) =>
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
                                        />
                                        <Input
                                            seoedId={'language_' + ind}
                                            id={'language_' + ind}
                                            defaultValue={val.language}
                                            updator={(e) =>
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
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setResumeUserData((prev) =>
                                                resumeUserDataRemover(prev, 'language', ind)
                                            )
                                        }
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() =>
                                    setResumeUserData((prev) => {
                                        if (prev.language === undefined)
                                            return {
                                                ...prev,
                                                language: [
                                                    {
                                                        language: '',
                                                        proficiency: 'basic',
                                                    },
                                                ],
                                            };
                                        return {
                                            ...prev,
                                            language: [
                                                ...prev.language,
                                                {
                                                    language: '',
                                                    proficiency: 'basic',
                                                },
                                            ],
                                        };
                                    })
                                }
                                type="button"
                                className="border-light-muted rounded-md border px-3 py-2 text-sm hover:scale-105"
                            >
                                + Add Language
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

console.log('Writing 1000+ lines of code is good or not?');
