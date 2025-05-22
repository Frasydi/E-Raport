import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router"; 
import navItems from "../data/navigasi"

const MenuCard = ({ title, icon }) => (
    <div className="size-48 bg-transparent rounded-md flex flex-wrap justify-center cursor-pointer group">
        <div className="size-40 bg-[#EFEEEE] rounded-4xl flex justify-center items-center group-hover:bg-[#dad9d9]">
            <FontAwesomeIcon
                icon={icon}
                className="text-7xl stroke-5 text-[#474747] group-hover:text-slate-900"
            ></FontAwesomeIcon>
        </div>
        <p className="text-center bg-transparent text-[#1c1c1c] group-hover:text-slate-900 font-medium text-sm font-poppins p-3 group-hover:text-shadow-md">
            {title}
        </p>

    </div>
);

const Menu = () => {
    return (
        <div className="container w-3xl p-10 border-t border-slate-50 border-b rounded-md drop-shadow-xl flex gap-6 flex-wrap items-center justify-center">
            {navItems.map((item, index) => (
                <Link className="cursor-pointer" to={item.path}>
                    <MenuCard key={index} title={item.name} icon={item.icon} />
                </Link>
            ))}
        </div>
    );
};

export default Menu;
