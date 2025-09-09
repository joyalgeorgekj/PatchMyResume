'use client';

export default function JsonEditor({
  value,
  setValue,
  error,
}: {
  value: string;
  setValue: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={12}
        className="w-full font-mono text-sm rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600"
      />
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
