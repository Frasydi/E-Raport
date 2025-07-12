import Input from "./Input";
import CustomSelect from "../CustomSelect";
import { forwardRef } from "react";

const ModalInput = forwardRef(
    (
        {
            type,
            placeholder,
            children,
            disabled,
            required,
            value,
            onChange,
            id,
            name,
            emptyMessage,
            options = [],
        },
        ref
    ) => {
        return (
            <div className="flex flex-col gap-1 w-full flex-1">
                {type === "select" ? (
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor={id}
                            className="text-xs text-gray-500 font-semibold"
                        >
                            {children}
                        </label>
                        <CustomSelect
                            id={id}
                            required={required}
                            name={name}
                            options={options}
                            placeholder={placeholder}
                            value={value}
                            emptyMessage={emptyMessage}
                            disabled={disabled}
                            onChange={onChange}
                        />
                    </div>
                ) : (
                    <>
                        <label
                            htmlFor={id}
                            className="text-xs text-gray-500 font-semibold"
                        >
                            {children}
                        </label>
                        <Input
                            type={type}
                            ref={ref} // <-- ref diteruskan ke Input
                            placeholder={placeholder}
                            id={id}
                            disabled={disabled}
                            name={name}
                            value={value}
                            onChange={onChange}
                            required={required}
                        />
                    </>
                )}
            </div>
        );
    }
);

export default ModalInput;
