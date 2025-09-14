import { featureList } from '@/data/constants/workflow';

export default function Feature() {
    return (
        <section id="features" className="bg-light-muted py-20">
            <div className="mobile:px-8 mx-auto max-w-6xl px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {featureList.map((feature, i) => (
                        <div
                            key={i}
                            className="border-dark-muted/15 bg-light hover:shadow-dark-muted/50 rounded-2xl border p-6 transition-all hover:scale-105 hover:shadow"
                        >
                            <h3 className="text-dark-intense mb-3 text-xl font-bold">
                                {feature.title}
                            </h3>
                            <p className="text-dark-muted">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
