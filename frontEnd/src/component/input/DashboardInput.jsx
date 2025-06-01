import Input from "./Input";

const InputDashboard = ({ htmlFor, children, type, placeholder, label = true }) => {
    return (
        <div className="flex items-center justify-between">
             {label && (
                <label htmlFor={htmlFor} className="mr-5 text-sm text-gray-700 font-medium">
                    {children}
                </label>
            )}
            <Input type={type} placeholder={placeholder} size={"w-64"}></Input>
        </div>
    );
};

export default InputDashboard;
