const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro', 'gemini-1.0-pro-vision'];

export default function StepSelectModel({
  model,
  setModel,
  apiKey,
  setApiKey,
}: {
  model: string;
  setModel: (val: string) => void;
  apiKey: string;
  setApiKey: (val: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Step 1: Select Model & API Key</h2>

      <label className="mb-2 block">Choose Model</label>
      <select
        value={model}
        required
        onChange={(e) => setModel(e.target.value)}
        className={` appearance-none pr-10 cursor-pointer text-sm`}
      >
        {models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <label className="mt-4 mb-2 block">API Key</label>
      <input
        type="password"
        required
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your API key"
        className={` text-sm`}
      />
    </div>
  );
}
