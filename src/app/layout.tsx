import LandingWrapper from '@/components/ui/landing/LandingWrapper';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

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
