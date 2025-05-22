import Input from "./Input";

const InputDashboard = ({ htmlFor, children, type, placeholder }) => {
    return (
        <div className="flex gap-5 items-center justify-between">
            <label htmlFor={htmlFor}>{children}</label>
            <Input type={type} placeholder={placeholder} size={"w-64"}></Input>
        </div>
    );
};

export default InputDashboard;
