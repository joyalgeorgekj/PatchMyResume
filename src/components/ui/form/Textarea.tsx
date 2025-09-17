import React, { ChangeEvent } from 'react';

function Textarea({
    defaultValue = '',
    updator,
    id,
    rows = 3,
    required = false,
    placeholder = 'Responsibilities (one per line)',
    className = "border-light-muted w-full rounded-lg border px-3 py-2 text-sm whitespace-pre-wrap break-words focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
}: {
    defaultValue?: string;
    updator: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    id: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    className?: string
}) {
    return (
        <textarea
            wrap="hard"
            id={id}
            placeholder={placeholder}
            aria-label={id}
            rows={rows}
            value={defaultValue}
            onChange={updator}
            className={className}
            required={required}
        />
    );
}

export default Textarea;
