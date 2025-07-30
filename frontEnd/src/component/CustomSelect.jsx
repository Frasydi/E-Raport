import { useEffect, useState, useRef } from "react";

const CustomSelect = ({
    options = [],
    placeholder = "Select an option", // Default placeholder (shown in trigger)
    name,
    id,
    value,
    disabled = false,
    onChange,
    displayKey = "label",
    valueKey = "value",
    emptyMessage = "Data belum ada", // Shown ONLY in dropdown when options=[]
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Check if the current value exists in options
    const isValueValid = () => {
        return value && options.some((opt) => getValue(opt) === value);
    };

    // Get the selected option object
    const getSelectedOption = () => {
        return options.find((opt) => getValue(opt) === value);
    };

    // Helper: Extract display text from an option
    const getDisplayText = (option) => {
        if (!option) return "";
        if (typeof option === "object" && displayKey) {
            return option[displayKey];
        }
        return option;
    };

    // Helper: Extract value from an option
    const getValue = (option) => {
        if (!option) return "";
        if (typeof option === "object" && valueKey) {
            return option[valueKey];
        }
        return option;
    };

    const toggleDropdown = () => {
        if (disabled) return; // Prevent opening if disabled
        setIsOpen(!isOpen);
    };

    const handleSelect = (val) => {
        if (options.length === 0) return; // Prevent selection if no options
        onChange(val);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
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
        <div ref={dropdownRef} className="relative">
            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={value} required />

            {/* Select Trigger (always shows placeholder if no valid value) */}
            <div
                id={id}
                onClick={toggleDropdown}
                className={`flex justify-between items-center px-3 py-2 rounded-md outline outline-gray-400 bg-white cursor-pointer transition-all ${
                    !isValueValid() ? "text-gray-400 italic" : "text-gray-800"
                } ${
                    disabled
                        ? "cursor-not-allowed opacity-50"
                        : "hover:border-gray-400"
                }`}
            >
                <span className={!isValueValid() ? "text-xs" : ""}>
                    {isValueValid()
                        ? getDisplayText(getSelectedOption())
                        : placeholder}
                </span>
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

            {/* Dropdown Menu */}
            {isOpen && (
                <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-44 overflow-y-auto">
                    {options.length === 0 ? (
                        <li className="px-4 py-2 text-sm text-gray-400 italic">
                            {emptyMessage}{" "}
                            {/* Custom empty message inside dropdown */}
                        </li>
                    ) : (
                        options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(getValue(option))}
                                className={`px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer transition ${
                                    value === getValue(option)
                                        ? "bg-blue-50 text-blue-400 font-medium"
                                        : ""
                                }`}
                            >
                                {getDisplayText(option)}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
