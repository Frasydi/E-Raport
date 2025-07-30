import { forwardRef } from "react";
const Input = forwardRef(
    (
        {
            type,
            placeholder,
            size,
            required,
            name,
            value,
            id,
            onChange,
            className,
            disabled,
        },
        ref
    ) => {
        return (
            <input
                type={type}
                ref={ref}
                className={`p-1.5 outline w-full rounded-md outline-gray-400 focus:outline-2 focus:outline-blue-300 ${size} placeholder:italic placeholder:text-sm placeholder:text-gray-500/70 font ${className} placeholder:text-xs`}
                placeholder={placeholder}
                name={name}
                value={value}
                disabled={disabled}
                id={id}
                onChange={onChange}
                required={required}
                autoComplete="off"
            />
        );
    }
);

export default Input;
