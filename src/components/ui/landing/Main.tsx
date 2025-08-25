export default function Main() {
    return (
        <section>
            <main className="mobile:px-8 laptop:px-12 mx-auto max-w-6xl px-6 py-20 text-center">
                <h1
                    className="text-dark mobile:text-5xl mb-2 text-sm leading-tight font-bold"
                    style={{ fontSize: 'xx-large' }}
                >
                    Build Resume,{' '}
                    <span className="text-primary border-b-4">
                        Get Hired<span className="animate-pulse">!</span>
                    </span>
                </h1>
                <p className="text-dark-muted mx-auto mb-8 max-w-2xl leading-relaxed">
                    Create professional, ATS-friendly resumes in minutes. Boost your career with
                    modern templates and smart suggestions.
                </p>
            </main>
        </section>
    );
}
