import { ResumeDataTypeZod } from '@/data/constants/types';
import { templates } from '@/data/templates';

export async function generateResume(data: ResumeDataTypeZod) {
    const pdfBytes = await templates.modern(
        {
            name: 'Alex Johnson',
            email: 'alex.johnson@example.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA, USA',
            links: [
                { platform: 'linkedin', url: 'https://www.linkedin.com/in/alexjohnson' },
                { platform: 'github', url: 'https://github.com/alexjohnson' },
                { platform: 'portfolio', url: 'https://alexjohnson.dev' },
            ],
            skills: [
                'JavaScript',
                'TypeScript',
                'React',
                'Next.js',
                'Node.js',
                'GraphQL',
                'MongoDB',
                'Docker',
                'Kubernetes',
                'AWS',
                'Team Leadership',
                'Agile Development',
            ],
            experience: [
                {
                    company: 'Tech Solutions Inc.',
                    title: 'Frontend Developer',
                    location: 'Remote',
                    startDate: new Date('2021-05-01'),
                    endDate: 'present',
                    workType: 'regular',
                    description:
                        '- Developed responsive web applications using React and Next.js\n- Collaborated with backend team to integrate REST and GraphQL APIs\n- Led a migration project from JavaScript to TypeScript',
                },
                {
                    company: 'Startup Labs',
                    title: 'Software Engineer Intern',
                    location: 'San Francisco, CA',
                    startDate: new Date('2020-06-01'),
                    endDate: new Date('2020-12-01'),
                    workType: 'freelance',
                    description:
                        '- Built a real-time chat feature using WebSockets\n' +
                        '- Implemented authentication with Firebase\n' +
                        '- Assisted in optimizing frontend performance by 25%',
                },
            ],
            education: [
                {
                    institute: 'University of California, Berkeley',
                    course: 'B.Sc. Computer Science',
                    location: 'Berkeley, CA',
                    grade: { value: '3.8', scale: 'GPA' },
                    startDate: new Date('2018-08-01'),
                    endDate: new Date('2022-05-01'),
                    description:
                        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
                },
            ],
            language: [
                { language: 'English', proficiency: 'native' },
                { language: 'Spanish', proficiency: 'professional' },
                { language: 'French', proficiency: 'basic' },
            ],
            summary:
                'A highly motivated software engineer with strong experience in frontend and full-stack development. Passionate about building scalable web applications, collaborating with diverse teams, and continuously learning modern technologies.',
            project: [
                {
                    name: 'TaskFlow',
                    type: 'personal',
                    code_link: 'https://github.com/alexjohnson/taskflow',
                    preview_link: 'https://taskflow.app',
                    tech_stack: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
                    description:
                        '- Developed a productivity app to manage tasks and deadlines\n' +
                        '- Integrated user authentication and role-based access control\n' +
                        '- Deployed using Docker and AWS ECS',
                },
            ],
            achievement: [
                {
                    type: 'certificate',
                    description: 'Certified AWS Solutions Architect – Associate',
                    url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
                    name: 'AWS Solutions Architect Certification',
                    issuer: 'Amazon Web Services',
                    date: new Date('2023-03-01'),
                },
                {
                    type: 'award',
                    description:
                        'Winner of Hack the Bay Hackathon for developing a logistics optimization app.',
                    url: 'https://hackthebay.dev',
                    name: 'Hack the Bay 2021 Winner',
                    issuer: 'Hack the Bay',
                    date: new Date('2021-09-01'),
                },
            ],
        },
        'light'
    );

    // ✅ convert to ArrayBuffer
    const blob = new Blob([pdfBytes.buffer as BlobPart], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);

    // preview
    window.open(url, 'resume');

    // // download
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'resume.pdf';
    // a.click();
}
