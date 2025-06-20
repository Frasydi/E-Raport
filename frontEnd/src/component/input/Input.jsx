const Input = ({ type, placeholder, size, required, name, value, id, onChange, className }) => {
    return (
        <input
            type={type}
            className={`p-1.5 outline rounded-md outline-gray-400 focus:outline-2 focus:outline-blue-300 ${size} placeholder:italic placeholder:text-sm  font-sans ${className}`}
            placeholder={placeholder}
            name={name}
            value={value}
            id={id}
            onChange={onChange}
            required={required}
            autoComplete="off"
        />
    );
};

export default Input