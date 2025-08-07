import Navbar from "../component/Navbar";
const LayoutMenu = ({ children, blur = false }) => {
    return (
        <div
            className={` w-10/12 flex flex-col items-center self-start mt-3 font-poppins ${
                blur ? "blur-xl h-screen overflow-hidden" : ""
            }`}
        >
            <div className="flex w-full items-center justify-center">
                <Navbar></Navbar>
            </div>
            {children}
        </div>
    );
};

export default LayoutMenu;
