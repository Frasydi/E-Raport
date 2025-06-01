import ModalPenilaian from "./ModalPenilaian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StepProgress from "../StepProgres";
import ProfilPenilaian from "./ProfilPenilaian";
import { Link } from "react-router";
import {
    faHeart,
    faRunning,
    faBrain,
    faLanguage,
    faSmile,
    faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

const kategoriList = [
    { label: "Nilai Agama dan Moral", icon: faHeart },
    { label: "Fisik Motorik", icon: faRunning },
    { label: "Kognitif", icon: faBrain },
    { label: "Bahasa", icon: faLanguage },
    { label: "Sosial dan Emosional", icon: faSmile },
    { label: "Seni", icon: faPaintBrush },
];
const KategoriPenilaian = () => {
    return (
        <ModalPenilaian>
            <ProfilPenilaian />
            <div className="mt-4 text-center text-sm text-gray-400">
                <p> Pilih kategori</p>
            </div>

            <div className="flex flex-col items-center bg-white shadow-md rounded-2xl py-6 px-4 w-full max-w-md mx-auto space-y-3">
                {kategoriList.map((item, index) => (
                    <Link
                        to={`/menu/penilaian/kategori-penilaian/${item.label}`}
                        key={index}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl shadow-sm"
                    >
                        <FontAwesomeIcon
                            icon={item.icon}
                            className="text-gray-600 w-5"
                        />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
            <StepProgress currentStep={1} />
        </ModalPenilaian>
    );
};

export default KategoriPenilaian;
