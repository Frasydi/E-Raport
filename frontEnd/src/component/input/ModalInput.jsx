import Input from "./Input";
import Select from "./Select";

const ModalInput = ({
    type,
    placeholder,
    htmlFor,
    children,
    required,
    options = [],
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
                    <Select id={'jenis_kelamin'} type={true} name={'jenis_kelamin'} options={options}/>
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