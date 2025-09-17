import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';

function Input({
    defaultValue,
    updator,
    id,
    seoedId,
    required=false,
    type='text',
    keyboard='text'
}: {
    defaultValue: string;
    updator: (e: ChangeEvent<HTMLInputElement>) => void;
    id: string;
    seoedId: string;
    required?: boolean;
    type?: HTMLInputTypeAttribute;
    keyboard?: "email" | "search" | "tel" | "text" | "url" | "none" | "numeric" | "decimal" 
}) {
    return (
        <input
            type={type}
            autoComplete={id}
            placeholder={"Enter " + id}
            aria-label={id}
            id={seoedId}
            onChange={updator}
            required={required || false}
            inputMode={keyboard}
            value={defaultValue}
        />
    );
}

export default Input;
