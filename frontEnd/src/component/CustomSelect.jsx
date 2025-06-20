import { useEffect, useState, useRef } from "react";

const CustomSelect = ({
    options = [],
    placeholder = "Select an option",
    name,
    id,
    value,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className={`relative`}>
            <input type="hidden" name={name} value={value} required/>

            <div
                id={id}
                onClick={toggleDropdown}
                className={`flex justify-between items-center px-3 py-2 rounded-md outline outline-gray-300 bg-white cursor-pointer transition-all ${
                    !value ? "text-gray-400 italic" : "text-gray-800"
                } hover:border-gray-400`}
            >
                <span>{value || placeholder}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {isOpen && (
                <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-44 overflow-y-auto">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(option)}
                            className={`px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer transition ${
                                value === option
                                    ? "bg-blue-50 text-blue-400 font-medium"
                                    : ""
                            }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
