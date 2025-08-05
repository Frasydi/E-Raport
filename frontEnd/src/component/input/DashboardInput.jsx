import Input from "./Input";

const InputDashboard = ({
    children,
    type,
    placeholder,
    label = true,
    name,
    value,
    onChange,
    id,
    className,
}) => {
    return (
        <div className=" w-full flex items-center justify-between gap-2">
            <div>
                {label && (
                    <label
                        htmlFor={id}
                        className="mr-5 text-sm text-gray-700 font-medium"
                    >
                        {children}
                    </label>
                )}
            </div>
            <div className="w-64">
                <Input
                    type={type}
                    placeholder={placeholder}
                    size={"w-full"}
                    name={name}
                    value={value}
                    id={id}
                    onChange={onChange}
                    className={className}
                ></Input>
            </div>
        </div>
    );
};

export default InputDashboard;
