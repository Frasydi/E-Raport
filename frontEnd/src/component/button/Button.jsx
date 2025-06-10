import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Button = ({ bg }) => {
    return (
        <Link
            to="/login"
            className={`${bg} px-8 py-3.5 rounded-full text-white font-medium text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5`}
        >
            Akses Platform Sekarang
        </Link>
    );
};

export const AddStudentButton = ({ icon, children, htmlFor, bg, OnClick }) => {
    return (
        <button 
            className={`${bg} px-6 py-2.5 rounded-lg text-white font-medium text-xs flex items-center space-x-2 transition-all duration-200 hover:shadow-md border border-white/10 hover:border-white/20`}
            onClick={OnClick}
        >
            <FontAwesomeIcon icon={icon} className="text-xs" />
            <label htmlFor={htmlFor} className="cursor-pointer tracking-tight">
                {children}
            </label>
        </button>
    );
};