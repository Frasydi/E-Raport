import { Link } from "react-router";
import Navbar from "../component/Navbar";
const LayoutMenu = ({ children, blur = false }) => {
    return (
        <div
            className={`w-10/12 flex flex-col items-center self-start mt-3 font-poppins ${
                blur ? "blur-xl h-screen overflow-hidden" : ""
            }`}
        >
            <div className="flex w-full items-center justify-center">
                <Link
                    to={"/menu"}
                    className="bg-gray-900 absolute left-0 p-2 rounded-e-xl shadow-2xl hover:bg-gray-800"
                >
                    <p className=" text-stone-200 text-sm  text-shadow-2xs cursor-pointer">
                        Back to Menu
                    </p>
                </Link>
                <Navbar></Navbar>
            </div>
            {children}
        </div>
    );
};

export default LayoutMenu;
