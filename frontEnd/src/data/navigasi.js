import {
    faHouse,
    faChildren,
    faChalkboardUser,
    faPenToSquare,
    faPrint,
    faCalendar,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
    {
        name: "Profil Sekolah",
        path: "/dashboard",
        icon: faHouse,
    },
    {
        name: "Kelola Users",
        path: "/kelola-users",
        icon: faUsers,
    },
    {
        name: "Guru & Kelas",
        path: "/guru-kelas",
        icon: faChalkboardUser,
    },

    {
        name: "Tahun Ajaran",
        path: "/tahun-ajaran",
        icon: faCalendar,
    },

    {
        name: "Data Peserta Didik",
        path: "/peserta-didik",
        icon: faChildren,
    },
    {
        name: "Penilaian Peserta Didik",
        path: "/penilaian",
        icon: faPenToSquare,
    },
    {
        name: "Cetak Raport",
        path: "/cetak-raport",
        icon: faPrint,
    },
];

export default navItems;
