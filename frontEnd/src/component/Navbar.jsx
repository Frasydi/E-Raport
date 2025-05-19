import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router";
import {
    faHouse,
    faChildren,
    faChalkboardUser,
    faPenToSquare,
    faPrint,
    faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
    {
        path: "/dashboard",
        icon: faHouse,
    },
    {
        path: "/peserta-didik",
        icon: faChildren,
    },
    {
        path: "/guru-kelas",
        icon: faChalkboardUser,
    },
    {
        path: "/penilaian",
        icon: faPenToSquare,
    },
    {
        path: "/cetak-raport",
        icon: faPrint,
    },
    {
        path: "/backup-restore",
        icon: faWindowRestore,
    },
];

const NavbarComponent = ({ path, icon }) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `w-15 h-15 rounded-2xl flex items-center justify-center group cursor-pointer transition-colors duration-200 ${
                    isActive
                        ? "bg-[#484848] text-slate-100"
                        : "bg-[#EFEEEE] text-[#474747] hover:bg-[#484848] hover:text-slate-100"
                }`
            }
        >
            <FontAwesomeIcon icon={icon} className="text-[34px] stroke-5" />
        </NavLink>
    );
};

const Navbar = () => {
    return (
        <div className="w-md h-18 rounded-2xl bg-[#cecdcd] flex items-center gap-3 justify-center m-auto">
            {navItems.map((items, index) => (
                <NavbarComponent
                    key={index}
                    icon={items.icon}
                    path={items.path}
                    type={items.type}
                />
            ))}
        </div>
    );
};

export default Navbar;
