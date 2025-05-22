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
        name: "Profil Sekolah",
        path: "/menu/dashboard",
        icon: faHouse,
    },
    {
        name: "Data Peserta Didik",
        path: "/menu/peserta-didik",
        icon: faChildren,
    },
    {
        name: "Guru & Kelas",
        path: "/menu/guru-kelas",
        icon: faChalkboardUser,
    },
    {
        name: "Penilaian Peserta Didik",
        path: "/menu/penilaian",
        icon: faPenToSquare,
    },
    {
        name: "Cetak Raport",
        path: "/menu/cetak-raport",
        icon: faPrint,
    },
    {
        name: "Backup dan Restore",
        path: "/menu/backup-restore",
        icon: faWindowRestore,
    },
];

export default navItems;
