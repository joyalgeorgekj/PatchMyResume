import { ResumeDataTypeZod } from '../constants/types';

export const ExampleResume: ResumeDataTypeZod = {
    name: '',
    email: '',
    phone: '',
    location: '',
    links: [{ platform: 'linkedin', url: '' }],
    summary: '',
    skills: [],
    education: [{
        course: '',
        institute: '',
        location: '',
        description: '', 
        startDate: new Date('2023-03')
    }],
    language: [{
        language: '',
        proficiency: 'basic'
    }]
};
