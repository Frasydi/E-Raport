import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({ htmlFor, placeholder, value, onChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();        
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-4 text-gray-500 pointer-events-none">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="search"
          id={htmlFor}
          className="w-full py-3 pl-12 pr-32 text-sm rounded-full bg-gray-100 text-gray-700 border-none shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          placeholder={placeholder || "Search..."}
          value={value}
          onChange={onChange}
        />
        <button
          type="submit"
          className="absolute right-2 px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
