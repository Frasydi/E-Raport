import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ProfilPenilaian = ({ data, isLocalStorage = false }) => {
    return (
        <div className="flex items-center justify-between mt-10 px-6 py-5 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
            <button
                onClick={() => {
                    if(isLocalStorage) {
                        localStorage.removeItem("pesertaDidik")
                    }
                    history.back();
                }}
                className="text-gray-600 hover:text-gray-800 transition z-10"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
            </button>
            <div className="text-center flex-1 ml-5 ">
                <p className="text-xl font-semibold text-gray-800  mb-2">
                    {data?.nama_lengkap}
                </p>
                <div className="flex  justify-center gap-3">
                    <p className="text-sm text-gray-500">{data?.tahun_ajaran}</p>
                    <p className="text-sm text-gray-500">||</p>
                    {data?.semester && (
                        <p className="text-sm text-gray-500">
                            {data.semester.toLowerCase() === "semester 1"
                                ? "Semester Ganjil"
                                : "Semester Genap"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilPenilaian;
