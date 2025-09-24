import { ResumeDataTypeZod } from '@/data/constants/types';
import { templates } from '@/data/templates';

export async function generateResume(data: ResumeDataTypeZod) {
    const pdfBytes = await templates.modern(data, 'light');

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
