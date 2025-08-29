export default function StepResumeData({
  resumeData,
  setResumeData,
}: {
  resumeData: string;
  setResumeData: (val: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Step 2: Resume Data</h2>
      <textarea
        value={resumeData}
        onChange={(e) => setResumeData(e.target.value)}
        rows={12}
        required
        className={`font-mono text-sm`}
      />
    </div>
  );
}
