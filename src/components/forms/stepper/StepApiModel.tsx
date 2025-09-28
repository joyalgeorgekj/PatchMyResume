import { MODELS } from '@/data/constants/workflow';
import { AiDataType } from './Main';
import { Dispatch, SetStateAction, useEffect } from 'react';

export default function StepApiModel({
    aiApiModel,
    setAiApiModel,
}: {
    aiApiModel: AiDataType;
    setAiApiModel: Dispatch<SetStateAction<AiDataType>>;
}) {
    useEffect(() => {
        setAiApiModel((prev) => ({ ...prev, Model: MODELS[0] }));
    }, []);
    return (
        <section aria-label="Model and API settings">
            <h2 className="text-base font-semibold md:text-xl">Step 1: Select Model & API Key</h2>
            <p className="text-dark-muted/80 mt-1 text-xs md:text-sm">
                Choose a Gemini model and API key. You can get it{' '}
                <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    className='underline underline-offset-4'
                    rel="noopener noreferrer"
                >
                    from Here
                </a>.
            </p>

            <form className="mt-6 grid gap-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="model" className="mb-2 block text-sm font-medium">
                        Model
                    </label>
                    <div className="relative">
                        <select
                            id="model"
                            value={aiApiModel.Model}
                            onChange={(e) =>
                                setAiApiModel((prev) => ({ ...prev, Model: e.target.value }))
                            }
                            className="border-ui-muted bg-light text-dark placeholder-dark-muted focus:border-primary-intense focus:ring-primary-intense w-full appearance-none rounded-lg border-2 px-4 py-2 pr-10 text-sm capitalize transition outline-none focus:ring-2"
                        >
                            {MODELS.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="apiKey" className="mb-2 block text-sm font-medium">
                        API Key
                    </label>
                    <input
                        id="apiKey"
                        type="password"
                        value={aiApiModel.API_KEY}
                        onChange={(e) =>
                            setAiApiModel((prev) => ({ ...prev, API_KEY: e.target.value }))
                        }
                        placeholder="Enter your API key"
                        className="border-ui-muted bg-light text-dark placeholder-dark-muted focus:border-primary-intense focus:ring-primary-intense w-full rounded-lg border-2 px-4 py-2 text-sm transition outline-none focus:ring-2"
                    />
                </div>
            </form>
        </section>
    );
}
