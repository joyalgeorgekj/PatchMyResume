'use client';

import { mainWorkFlowSteps } from '@/data/constants/workflow';
import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export default function HowItWorks() {
    const [openStep, setOpenStep] = useState<number>(1);

    return (
        <section className="bg-light">
            <div className="tablet:py-20 laptop:py-24 mx-auto max-w-6xl px-6 py-16">
                {/* Heading */}
                <div className="mx-auto text-center">
                    <span className="border-dark-muted/45 bg-surface text-dark inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                        Main Flow
                        <span className="bg-accent mx-2 h-2 w-2 animate-pulse rounded-full" />
                        PatchMyResume
                    </span>
                    <h2 className="text-dark laptop:text-4xl mt-4 text-xl md:text-3xl font-bold tracking-tight">
                        Tailor your resume in five precise steps
                    </h2>
                    <p className="text-dark-muted mt-3 text-xs md:text-base">
                        Minimal clicks, maximum control. Keep your data local, choose your AI model,
                        and export an ATS-friendly PDF.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-5 mt-8 grid grid-cols-1 gap-4">
                    {mainWorkFlowSteps.map((s) => {
                        const isOpen = openStep === s.id;
                        return (
                            <div
                                key={s.id}
                                className="border-dark-muted/15 bg-surface hover:border-dark-muted/50 hover-border-2 relative flex cursor-pointer flex-col gap-3 rounded-2xl border p-5 transition hover:scale-95"
                                onClick={() => setOpenStep(isOpen ? 0 : s.id)}
                            >
                                {/* Step header */}
                                <div className="flex items-start justify-between select-none">
                                    <div className="flex gap-3 items-center">
                                        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold">
                                            {s.id}
                                        </div>
                                        <h3 className="text-dark pt-0.5 text-sm md:text-lg font-semibold">
                                            {s.title}
                                        </h3>
                                    </div>

                                    <span className="text-dark-muted my-auto transition">
                                        {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                                    </span>
                                </div>

                                {/* Expanded content */}
                                {isOpen && (
                                    <div className="border-dark-muted/25 border-t">
                                        <p className="text-dark-muted/90 mt-2 text-xs md:text-sm leading-relaxed whitespace-pre-line select-none">
                                            {s.more}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
