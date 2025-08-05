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
            classname,
            allowEmpty,
            emptyLabel,
            flexCol = "flex-col",
            options = [],
            rows = 4, // tambahkan rows untuk textarea
        },
        ref
    ) => {
        return (
            <div className={`flex flex-col w-full flex-1 ${classname}`}>
                {type === "select" ? (
                    <div className={`flex ${flexCol} gap-1.5`}>
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
                            allowEmpty={allowEmpty}
                            emptyLabel={emptyLabel}
                            disabled={disabled}
                            onChange={onChange}
                        />
                    </div>
                ) : type === "textarea" ? ( // <--- tambahkan ini
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor={id}
                            className="text-xs text-gray-500 font-semibold"
                        >
                            {children}
                        </label>
                        <textarea
                            ref={ref}
                            id={id}
                            name={name}
                            placeholder={placeholder}
                            disabled={disabled}
                            required={required}
                            value={value}
                            onChange={onChange}
                            rows={rows}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-1.5 ">
                        <label
                            htmlFor={id}
                            className="text-xs text-gray-500 font-semibold"
                        >
                            {children}
                        </label>
                        <Input
                            type={type}
                            ref={ref}
                            placeholder={placeholder}
                            id={id}
                            disabled={disabled}
                            name={name}
                            value={value}
                            onChange={onChange}
                            required={required}
                        />
                    </div>
                )}
            </div>
        );
    }
);

export default ModalInput;
