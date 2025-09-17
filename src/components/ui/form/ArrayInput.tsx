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
            className="shadow-dark-muted/15 cursor-pointer rounded-xs px-2 py-0 text-xs shadow-xs"
            onClick={updator}
        >
            {value}
        </span>
    );
}

export default ArrayInput;
