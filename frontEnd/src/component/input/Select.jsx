const Select = ({ type, options, name, id}) => {
    return (
        <>
            {type ? (
                <select
                    name={name}
                    id = {id}
                    className={`p-1.5 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 ${"w-full"} placeholder:italic placeholder:text-sm placeholder:font-light`}
                    required
                >
                    {options.map((value, index) => (
                        <option key={index} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            ) : (
                <select
                    name="tahun_ajaran"
                    id="tahun_ajaran"
                    className=" w-2/3 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 p-1.5"
                    required
                >
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
