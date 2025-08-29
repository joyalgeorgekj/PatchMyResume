import Link from 'next/link';
import ThemeButton from './ThemeButton';

export default function Header() {
    return (
        <header className="border-dark-muted/15 bg-light w-full border-b">
            <div className="mobile:px-8 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
                <Link href="/" className="text-dark flex gap-1 font-bold">
                    <span className="text-primary border-b-2 transition-all hover:border-b-4">
                        PatchMyResume
                    </span>
                </Link>

                {/* CTA */}
                <div className="flex gap-4">
                    <ThemeButton />
                    <Link
                        href="/signin"
                        // className="px-4 py-2 shadow-btn border font-medium text-text"
                        className="border-base flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 bg-linear-65 from-pink-600 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:scale-105 whitespace-pre"
                    >
                        Sign In to Use
                    </Link>
                </div>
            </div>
        </header>
    );
}
