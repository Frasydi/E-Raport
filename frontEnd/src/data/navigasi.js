import {
    faHouse,
    faChildren,
    faChalkboardUser,
    faPenToSquare,
    faPrint,
    faWindowRestore,
    faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
    {
        name: "Profil Sekolah",
        path: "/dashboard",
        icon: faHouse,
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
    {
        name: "Backup dan Restore",
        path: "/backup-restore",
        icon: faWindowRestore,
    },
];

export default navItems;
