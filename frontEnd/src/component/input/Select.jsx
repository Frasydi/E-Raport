const Select = ({ typeOption, options, name, id, children }) => {
    return (
        <>
            {typeOption ? (
                <select
                    name={name}
                    id={id}
                    className="p-1.5 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 placeholder:italic placeholder:text-sm placeholder:font-light"
                    required
                >
                    <option value={children} disabled selected>
                        {children}
                    </option>
                    {options.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            ) : (
                <select
                    name={name}
                    id={id}
                    className=" w-2/3 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 p-1.5"
                    required
                >
                    <option value={children} disabled selected>
                        {children}
                    </option>
                    {options.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
};

export default Select;
