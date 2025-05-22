import Input from "./Input";

const ModalInput = ({
    type,
    placeholder,
    htmlFor,
    children,
    options = [],
    required,
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {type == "select" ? (
                <div type={"radio"}>
                    <label
                        htmlFor={htmlFor}
                        className="text-xs text-gray-500 font-semibold"
                    >
                        {children}
                    </label>
                    <select
                        name="jenis_kelamin"
                        id="jenis_kelamin"
                        className={`p-1.5 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 ${"w-full"} placeholder:italic placeholder:text-sm placeholder:font-light`} required={required}
                    >
                        {options.map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <>
                    <label
                        htmlFor={htmlFor}
                        className="text-xs text-gray-500 font-semibold"
                    >
                        {children}
                    </label>

                    <Input
                        type={type}
                        placeholder={placeholder}
                        required={required}
                    ></Input>
                </>
            )}
        </div>
    );
};

export default ModalInput;