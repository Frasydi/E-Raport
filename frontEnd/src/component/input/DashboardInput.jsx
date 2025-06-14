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
    className
}) => {
    return (
        <div className="flex items-center justify-between gap-2">
            {label && (
                <label
                    htmlFor={id}
                    className="mr-5 text-sm text-gray-700 font-medium"
                >
                    {children}
                </label>
            )}
            <Input
                type={type}
                placeholder={placeholder}
                size={"w-64"}
                name={name}
                value={value}
                id={id}
                onChange={onChange}
                className={className}
            ></Input>
        </div>
    );
};

export default InputDashboard;
