import Input from "./Input";
import CustomSelect from "../CustomSelect";
const ModalInput = ({
    type,
    placeholder,
    children,
    required,
    value,
    onChange,
    id,
    name,
    options = [],
}) => {
    return (
        <div className="flex flex-col gap-1 w-full flex-1">
            {type == "select" ? (
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor={id}
                        className="text-xs text-gray-500 font-semibold"
                    >
                        {children}
                    </label>
                    <CustomSelect id={id} name={name} options={options} placeholder={placeholder} value={value} onChange={onChange}></CustomSelect>
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
                        placeholder={placeholder}
                        id={id}
                        name={name}
                        required={required}
                    ></Input>
                </>
            )}
        </div>
    );
};

export default ModalInput;