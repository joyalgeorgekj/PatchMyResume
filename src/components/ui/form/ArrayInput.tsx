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
            className="bg-light-muted text-dark-intense me-2 cursor-pointer rounded-sm px-2.5 py-0.5 pt-1 text-xs font-medium"
            onClick={updator}
        >
            {value}
        </span>
    );
}

export default ArrayInput;
