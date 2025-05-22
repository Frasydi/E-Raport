import { Link } from "react-router"
import Navbar from "../component/Navbar"
const LayoutMenu =({children, blur = false})=> {
    return(
        <div className={`w-10/12 flex flex-col items-center self-start mt-3 font-poppins ${blur ? 'blur-xs': ''}`}>
            <div className="flex w-full items-center justify-center">
                <Link to={'/menu'}>
                    <p className="border-b border-b-gray-800 text-gray-800 text-sm hover:text-gray-900 text-shadow-2xs cursor-pointer">Menu</p>
                </Link>
                <Navbar></Navbar>
            </div>
            {children}
        </div>
    )
}

export default LayoutMenu