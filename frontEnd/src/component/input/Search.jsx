import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ htmlFor, placeholder, label, value, onChange }) => {
    return (
        <div className="relative w-full max-w-md">
            {label && (
                <label 
                    htmlFor={htmlFor} 
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass} 
                        className="w-4 h-4 text-gray-400" 
                    />
                </div>
                <input
                    type="search"
                    id={htmlFor}
                    className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={placeholder || "Search..."}
                    value={value}
                    onChange={onChange}
                />

            </div>
        </div>
    );
};

export default Search;