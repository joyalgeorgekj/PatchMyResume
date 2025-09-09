import LandingWrapper from '@/components/ui/landing/LandingWrapper';
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next';
import './globals.css';
import { UIProvider } from '@/context/UIContext';

export const metadata: Metadata = {
    title: 'PatchMyResume',
    description:
        'Resume optimization tool that helps people tailor their resumes to a job description.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`font-mono antialiased`}>
                <ThemeProvider attribute="class" enableSystem>
                    <LandingWrapper>{children}</LandingWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
