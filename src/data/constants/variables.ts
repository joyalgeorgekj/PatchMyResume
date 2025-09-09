import { FaApple, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthListType, FeatureList, MainWorkFlowSteps, ResumeDataType } from './types';

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

export const ExampleResume: ResumeDataType = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-234-567-890',
    location: 'San Francisco, CA',
    links: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe' },
        { platform: 'github', url: 'https://github.com/johndoe' },
        { platform: 'portfolio', url: 'https://johndoe.dev' },
    ],
    summary:
        'Full-stack developer with 5+ years of experience building scalable web and mobile applications using React, Next.js, Node.js, and cloud technologies. Passionate about performance optimization and delivering user-centric solutions.',
    experience: [
        {
            title: 'Senior Software Engineer',
            company: 'Example Inc.',
            location: 'San Francisco, CA',
            startDate: new Date('2021-06'),
            endDate: 'present',
            workType: 'regular',
            description:
                'Led a team of 6 engineers in developing SaaS applications using Next.js and Node.js.\n- Implemented CI/CD pipelines reducing deployment time by 40%.\n- Collaborated with product managers to design features increasing user retention by 25%.',
        },
        {
            title: 'Software Engineer',
            company: 'Example Solutions',
            location: 'Remote',
            startDate: new Date('2018-04'),
            endDate: new Date('2021-05'),
            workType: 'regular',
            description:
                'Developed microservices in Node.js and deployed on AWS Lambda.\n- Built responsive React dashboards with TailwindCSS.\n- Optimized database queries, reducing API response time by 30%.',
        },
    ],
    project: [
        {
            name: 'PatchMyResume',
            type: 'personal',
            code_link: 'https://patchmyresume.ai',
            preview_link: 'https://patchmyresume.ai',
            tech_stack: ['Next.js', 'Node.js', 'Google AI'],
            description:
                'AI-powered resume tailoring tool helping users customize resumes for specific job descriptions.',
        },
        {
            name: 'TaskFlow',
            type: 'open-source',
            code_link: 'https://github.com/johndoe/taskflow',
            preview_link: 'https://github.com/johndoe/taskflow',
            tech_stack: ['React', 'Firebase'],
            description:
                'Open-source task management app with real-time collaboration using Firebase and React.',
        },
    ],
    skills: [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'TailwindCSS',
        'Appwrite',
        'Firebase',
        'AWS',
        'Docker',
        'Git',
        'SQL',
        'MongoDB',
    ],
    education: [
        {
            institute: 'University of California, Berkeley',
            course: 'B.Sc. Computer Science',
            location: 'Berkeley, CA',
            startDate: new Date('2013-08'),
            endDate: new Date('2017-05'),
        },
    ],
    achievement: [
        {
            type: 'certificate',
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            description: 'AWS Certified Solutions Architect',
            url: '',
            date: new Date('2020'),
        },
        {
            type: 'certificate',
            name: 'Certified Kubernetes Administrator',
            issuer: 'Cloud Native Computing Foundation',
            description: 'Certified Kubernetes Administrator',
            url: '',
            date: new Date('2019'),
        },
        {
            type: 'award',
            name: 'Employee of the Year',
            issuer: 'Example Inc.',
            description: 'Recognized as Employee of the Year',
            url: '',
            date: new Date('2022'),
        },
        {
            type: 'publication',
            name: 'Optimizing React Apps for Performance',
            issuer: 'Medium',
            description: 'Article on optimizing React applications',
            url: 'https://medium.com/@johndoe/react-performance',
            date: new Date('2021'),
        },
    ],
    language: [
        { language: 'English', proficiency: 'native' },
        { language: 'Spanish', proficiency: 'professional' },
    ],
};


export const STEPS = [
    { id: 1, label: 'API & Model' },
    { id: 2, label: 'Resume Data' },
    { id: 3, label: 'Job Description' },
    { id: 4, label: 'AI Suggestions' },
    { id: 5, label: 'Final Review' },
];

export const MODELS = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-1.0-pro',
    'gemini-1.0-pro-vision',
];
