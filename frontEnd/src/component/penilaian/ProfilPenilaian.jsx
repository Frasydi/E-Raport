import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ProfilPenilaian = () => {
    return (
        <div className="flex items-center justify-between mt-20 px-6 py-5 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
            <button
                onClick={() => history.back()}
                className="text-gray-600 hover:text-gray-800 transition z-10"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 -ml-5">
                <p className="text-xl font-semibold text-gray-800">
                    Ayub Saipudin
                </p>
                <p className="text-sm text-gray-500">Kelas A</p>
            </div>
        </div>
    );
};

export default ProfilPenilaian;
