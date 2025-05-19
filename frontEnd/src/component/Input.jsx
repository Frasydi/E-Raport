const Input = ({htmlFor, children, type, placeholder}) => {
    return (
        <div className="flex gap-5 items-center justify-between">
            <label htmlFor={htmlFor}>{children}</label>
            <input
                type={type}
                className="p-1.5 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 w-64"
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;
