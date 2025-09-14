import { ResumeDataType } from "../constants/types";

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