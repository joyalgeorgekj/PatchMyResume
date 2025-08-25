import { IconType } from 'react-icons';
import { FaApple, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export interface AuthListType {
    Icon: IconType;
    label: string;
}

export const authList: AuthListType[] = [
    {
        Icon: FcGoogle,
        label: 'Google',
    },
    {
        Icon: FaGithub,
        label: 'GitHub',
    },
    {
        Icon: FaLinkedin,
        label: 'LinkedIn',
    },
    {
        Icon: FaApple,
        label: 'Apple',
    },
];

export interface MainWorkFlowSteps {
    id: number;
    title: string;
    more: string;
}

export const mainWorkFlowSteps: MainWorkFlowSteps[] = [
    {
        id: 1,
        title: 'Connect your AI',
        more: '- Paste your personal Gemini API key. \n- We never proxy your key—requests go from your browser to Google directly. \n- You can change models anytime from Settings.',
    },
    {
        id: 2,
        title: 'Add resume JSON & JD',
        more: '- Provide your resume (JSON) and the job description (text). \n- Keep resume structured: name, summary, experience[], projects[], education[], certificates[], skills[], links[]. \n- Paste JD verbatim for best keyword extraction.',
    },
    {
        id: 3,
        title: 'Generate smart suggestions',
        more: '- AI proposes multiple options for each resume section. \n- We extract key phrases from the JD and generate rewrites per section—summary, bullets, skills—while maintaining your voice and facts.',
    },
    {
        id: 4,
        title: 'Pick & preview',
        more: '- Select your favorite suggestions and preview the resume. \n- Nothing is overridden automatically. \n- You stay in control—choose per field and instantly preview the final resume.',
    },
    {
        id: 5,
        title: 'Export to PDF',
        more: '- We render to LaTeX and export a clean, ATS-friendly PDF. \n- Choose template, spacing, and section order. \n- Exports are deterministic and formatting-safe for ATS parsers.',
    },
];

export interface FeatureList {
    title: string;
    desc: string;
}

export const featureList: FeatureList[] = [
    {
        title: 'ATS Optimized',
        desc: 'Ensure your resume passes automated screenings with best-practice formatting.',
    },
    {
        title: 'Customizable Templates',
        desc: 'Choose from sleek designs tailored to modern industries.',
    },
    {
        title: 'Smart Suggestions',
        desc: 'AI-powered improvements for stronger wording and layout.',
    },
];
