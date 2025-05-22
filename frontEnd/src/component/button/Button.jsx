import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 export const Button = ({ bg }) => {
    return (
        <Link
            to="/login"
            className={`px-5 ${bg} py-2 rounded-2xl text-white font-semibold shadow-2xl hover:bg-[#2e507a]`}
            data-ripple-light="true"
        >
            MULAI
        </Link>
    );
};

export const AddStudentButton = ({icon, children, htmlFor, bg, OnClick}) => {
    return (
        <button className={`p-2 rounded-2xl ${bg} cursor-pointer text-white`} onClick={OnClick}>
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            <label
                htmlFor= {htmlFor}
                className="ml-2 cursor-pointer"
            >
                {children}
            </label>
        </button>
    );
};

