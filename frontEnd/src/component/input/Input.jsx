const Input = ({ type, placeholder, size, required }) => {
    return (
        <input
            type={type}
            className={`p-1.5 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 ${size} placeholder:italic placeholder:text-sm placeholder:font-light"`}
            placeholder={placeholder}
            required={required}
        />
    );
};

export default Input