import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import navItems from "../data/navigasi";

const NavbarComponent = ({ path, icon, label }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `relative w-15 h-15 rounded-2xl flex flex-col items-center justify-center 
         group cursor-pointer transition-colors duration-200 ${
           isActive
             ? "bg-[#484848] text-white"
             : "bg-[#EFEEEE] text-[#474747] hover:bg-[#484848] hover:text-white"
         }`
      }
    >
      <FontAwesomeIcon icon={icon} className="text-[34px]" />
      
      {/* Tooltip manual */}
      <span
        className="
          absolute
          bottom-[-40px]            
          px-3 py-1
          text-xs text-white
          bg-gray-800             
          rounded-md
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
          whitespace-nowrap
          z-20
          shadow-md
        "
      >
        {label}
      </span>
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <div className="w-xl max-w-xl h-18 rounded-2xl bg-[#cecdcd] flex items-center justify-around">
      {navItems.map((item, index) => (
        <NavbarComponent
          key={index}
          icon={item.icon}
          path={item.path}
          label={item.name} 
        />
      ))}
    </div>
  );
};

export default Navbar;
