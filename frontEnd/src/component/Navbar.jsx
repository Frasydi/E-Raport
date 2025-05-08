import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faChildren,
    faChalkboardUser,
    faPenToSquare,
    faPrint,
    faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
    faHouse,
    faChildren,
    faChalkboardUser,
    faPenToSquare,
    faPrint,
    faWindowRestore,
];

const NavbarComponent = ({ icon }) => {
    return (
        <div className="w-15 h-15 bg-[#EFEEEE] rounded-2xl flex items-center justify-center group hover:bg-[#484848] cursor-pointer">
            <FontAwesomeIcon
                icon={icon}
                className="text-[34px] stroke-5 text-[#474747] group-hover:text-slate-100"
            ></FontAwesomeIcon>
        </div>
    );
};

const Navbar = () => {
    return (
        <div className="w-md h-18 rounded-2xl bg-[#cecdcd] flex items-center gap-3 justify-center">
            {navItems.map((items, index) => (
                <NavbarComponent key={index} icon={items} />
            ))}
        </div>
    );
};

export default Navbar;
