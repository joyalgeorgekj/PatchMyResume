import React, { MouseEvent } from 'react';

function ArrayInput({
    updator,
    value,
}: {
    updator: (e: MouseEvent<HTMLSpanElement>) => void;
    value: string;
}) {
    return (
        <span
            className="bg-light-muted text-dark-intense text-xs font-medium me-2 px-2.5 py-0.5 pt-1 rounded-sm cursor-pointer"
            onClick={updator}
        >
            {value}
        </span>
    );
}

export default ArrayInput;
