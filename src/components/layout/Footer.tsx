import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-dark-muted/15 bg-light w-full border-t py-8">
            <div className="mobile:flex-row mobile:px-8 mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:gap-4 px-6 lg:px-12">
                <nav className="text-dark flex space-x-4 text-sm">
                    <Link href="/privacy" className="hover:text-dark text-xs md:text-sm">
                        Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-dark text-xs md:text-sm">
                        Terms
                    </Link>
                    <Link href="/contact" className="hover:text-dark text-xs md:text-sm">
                        Contact
                    </Link>
                </nav>
                <p className="text-dark text-xs md:text-sm text-center">
                    © {new Date().getFullYear()} PatchMyResume. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
