import { IconType } from 'react-icons';

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
export type TypeOfProjects = 'personal' | 'academic' | 'professional' | 'open-source';

export interface ProjectType {
    name: string;
    type: TypeOfProjects;
    code_link: string;
    preview_link: string;
    tech_stack: string[];
    description: string;
}
export type GradeScale = 'GPA' | 'Percentage' | 'CGPA' | 'Other';

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

export type TypesOfAchievement =
    | 'certificate'
    | 'award'
    | 'publication'
    | 'honor'
    | 'scholarship'
    | 'other';

export interface AchievementType {
    type: TypesOfAchievement;
    description: string;
    url: string;
    name: string;
    issuer: string;
    date?: Date;
}

export type ProficiencyType = 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';

export interface LanguageType {
    language: string;
    proficiency: ProficiencyType;
}

export type SkillType = string[];

export type SocialPlatformTypes =
    | 'github'
    | 'linkedin'
    | 'portfolio'
    | 'twitter'
    | 'dribbble'
    | 'behance'
    | 'other';

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
