import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputDashboard from "./DashboardInput"
import ButtonSubmit from '../button/Button_submit'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({htmlFor, placeholder}) => {
    return (
        <>
            <InputDashboard
                type={"search"}
                htmlFor={htmlFor}
                placeholder={placeholder}
            ></InputDashboard>
            <ButtonSubmit
                bg={"bg-blue-600"}
                type={"submit"}
                hover={"hover:bg-blue-700"}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </ButtonSubmit>
        </>
    );
};

export default Search;
