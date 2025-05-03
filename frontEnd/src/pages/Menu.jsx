import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChildren, faChalkboardUser, faPenToSquare, faPrint, faWindowRestore } from "@fortawesome/free-solid-svg-icons";

const menuItems = [
    {
        name: "Profil Sekolah",
        icon: faHouse,
    },
    {
        name: "Data Peserta Didik",
        icon: faChildren,
    },
    {
        name: "Guru & Kelas",
        icon: faChalkboardUser,
    },
    {
        name: "Penilaian Peserta Didik",
        icon: faPenToSquare,
    },
    {
        name: "Cetak Raport",
        icon: faPrint,
    },
    {
        name: "Backup dan Restore",
        icon: faWindowRestore,
    },
];

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
            {menuItems.map((item, index) => (
                <MenuCard key={index} title={item.name} icon={item.icon} />
            ))}
        </div>
    );
};

export default Menu;
