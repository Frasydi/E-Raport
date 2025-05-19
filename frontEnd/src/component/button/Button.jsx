import { Link } from "react-router";
const Button = ({bg}) => {
    return(
        <Link to="/login" className={`px-5 ${bg} py-2 rounded-2xl text-white font-semibold shadow-2xl hover:bg-[#2e507a]`}
        data-ripple-light="true">MULAI</Link>
    );
};

export default Button;
