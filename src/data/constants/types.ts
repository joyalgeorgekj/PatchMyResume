import { IconType } from 'react-icons';
import * as z from 'zod';
import { MODELS } from './workflow';

// =========================================================
//                     WORKFLOW TYPES
// =========================================================

export interface AuthListType {
    Icon: IconType;
    label: string;
}

export interface MainWorkFlowSteps {
    id: number;
    title: string;
    more: string;
}

export interface FeatureList {
    title: string;
    desc: string;
}

// =========================================================
//                     TYPESCRIPT TYPES
// =========================================================

export type TypesOfAchievement =
    | 'certificate'
    | 'award'
    | 'publication'
    | 'honor'
    | 'scholarship'
    | 'other';
export type SocialPlatformTypes =
    | 'github'
    | 'linkedin'
    | 'portfolio'
    | 'twitter'
    | 'dribbble'
    | 'behance'
    | 'other';
export type ProficiencyType = 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';
export type GradeScale = 'GPA' | 'Percentage' | 'CGPA' | 'Other';
export type TypeOfProjects = 'personal' | 'academic' | 'professional' | 'open-source';
export type WorkType = 'regular' | 'freelance' | 'volunteer';

export interface ExperienceType {
    company: string;
    title: string;
    location: string;
    startDate: Date;
    endDate?: Date | 'present';
    workType: WorkType;
    description: string;
}

export interface ProjectType {
    name: string;
    type: TypeOfProjects;
    code_link: string;
    preview_link: string;
    tech_stack: string[];
    description: string;
}

export interface EducationType {
    institute: string;
    course: string;
    location: string;
    description?: string;
    grade?: {
        value: string;
        scale?: GradeScale;
    };
    startDate: Date;
    endDate?: Date | 'present';
}

export interface AchievementType {
    type: TypesOfAchievement;
    description: string;
    url: string;
    name: string;
    issuer: string;
    date?: Date;
}

export interface LanguageType {
    language: string;
    proficiency: ProficiencyType;
}

export type SkillType = string[];

export interface LinkType {
    platform: SocialPlatformTypes;
    url: string;
}

export interface ResumeDataType {
    name: string;
    email: string;
    phone: string;
    location: string;
    links: LinkType[];
    skills: string[];
    experience: ExperienceType[];
    education: EducationType[];
    language: LanguageType[];
    summary?: string;
    project?: ProjectType[];
    achievement?: AchievementType[];
}

// =========================================================
//                      ZOD TYPES
// =========================================================

const SocialPlatformTypesEnum = z.enum([
    'github',
    'linkedin',
    'portfolio',
    'twitter',
    'dribbble',
    'behance',
    'other',
]);
const ProficiencyTypeEnum = z.enum(['native', 'fluent', 'professional', 'intermediate', 'basic']);
const TypesOfAchievementEnum = z.enum([
    'certificate',
    'award',
    'publication',
    'honor',
    'scholarship',
    'other',
]);
const GradeScaleEnum = z.enum(['GPA', 'Percentage', 'CGPA', 'Other']);
const TypeOfProjectsEnum = z.enum(['personal', 'academic', 'professional', 'open-source']);
const WorkTypeEnum = z.enum(['regular', 'freelance', 'volunteer']);

const dateSchema = z.preprocess(
    (val) => (typeof val === 'string' || val instanceof Date ? new Date(val) : val),
    z.date()
);

export const ExperienceTypeSchema = z.object({
    company: z.string(),
    title: z.string(),
    location: z.string(),
    startDate: dateSchema,
    endDate: z.union([dateSchema, z.literal('present')]).optional(),
    workType: WorkTypeEnum,
    description: z.string(),
});

export const LinkTypeSchema = z.object({
    platform: SocialPlatformTypesEnum,
    url: z.union([z.url(), z.literal('')]),
});

export const EducationTypeSchema = z.object({
    institute: z.string().min(2),
    course: z.string().min(2),
    location: z.string().min(2),
    description: z.string().min(2).optional(),
    grade: z
        .object({
            value: z.string().min(2),
            scale: GradeScaleEnum.optional(),
        })
        .optional(),
    startDate: dateSchema,
    endDate: z.union([dateSchema, z.literal('present')]).optional(),
});

export const LanguageTypeSchema = z.object({
    language: z.string().min(2),
    proficiency: ProficiencyTypeEnum,
});
export const ProjectTypeSchema = z.object({
    name: z.string().min(2),
    type: TypeOfProjectsEnum,
    code_link: z.union([z.url(), z.literal('')]),
    preview_link: z.union([z.url(), z.literal('')]).optional(),
    tech_stack: z.array(z.string().min(2)),
    description: z.string().min(2),
});
export const AchievementTypeSchema = z.object({
    type: TypesOfAchievementEnum,
    description: z.string().min(2),
    url: z.string().optional(),
    name: z.string().min(2),
    issuer: z.string().min(2),
    date: dateSchema.optional(),
});

export const ResumeSchema = z.object({
    name: z.string().min(2),
    email: z.union([z.email(), z.literal('')]),
    summary: z.string().min(2),
    location: z.string().min(2),
    phone: z.union([z.string().regex(/^[0-9+()\-\s]+$/), z.literal('')]),
    links: z.array(LinkTypeSchema).max(3),
    skills: z.array(z.string().min(2)),
    education: z.array(EducationTypeSchema),
    language: z.array(LanguageTypeSchema),
    experience: z.array(ExperienceTypeSchema).optional(),
    project: z.array(ProjectTypeSchema).optional(),
    achievement: z.array(AchievementTypeSchema).optional(),
});

export const DocumentMainScheme = z.object({
    id: z.string().min(10).optional(),
    api_key: z.string().min(10),
    model: z.enum(MODELS),
    resume_user_data: ResumeSchema,
});

export type ExperienceTypeZod = z.infer<typeof ExperienceTypeSchema>;
export type LinkTypeZod = z.infer<typeof LinkTypeSchema>;
export type EducationTypeZod = z.infer<typeof EducationTypeSchema>;
export type LanguageTypeZod = z.infer<typeof LanguageTypeSchema>;
export type ProjectTypeZod = z.infer<typeof ProjectTypeSchema>;
export type AchievementTypeZod = z.infer<typeof AchievementTypeSchema>;
export type ResumeDataTypeZod = z.infer<typeof ResumeSchema>;
export type DocumentMainTypeZod = z.infer<typeof DocumentMainScheme>;

// =========================================================
//                   AI SUGGESTION TYPES
// =========================================================

export type OptionsType = {
    option1: string;
    option2: string;
};

export type SuggestionsType = {
    summary?: OptionsType[];
    experience?: OptionsType[];
    projects?: OptionsType[];
    skills?: OptionsType[];
    education?: OptionsType[];
    achievement?: OptionsType[];
};
