export default function StepJobDescription({
  jobDescription,
  setJobDescription,
}: {
  jobDescription: string;
  setJobDescription: (val: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Step 3: Job Description</h2>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={6}
        required
        placeholder="Paste job description here..."
        className={` font-mono text-sm`}
      />
    </div>
  );
}
