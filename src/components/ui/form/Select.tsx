import { ChangeEvent } from 'react';

function Select({
    defaultValue,
    updator,
    options,
    id,
    disable=false
}: {
    defaultValue: string;
    updator: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    id: string;
    disable?: boolean;
}) {
    return (
        <select
            id={id}
            defaultValue={defaultValue}
            onChange={updator}
            aria-label={id}
            disabled={disable}
        >
            {options.map((val, ind) => (
                <option key={ind} value={val}>
                    {val}
                </option>
            ))}
        </select>
    );
}

export default Select;
