import ModalPenilaian from "./ModalPenilaian";
import StepProgress from "../StepProgres";
import ProfilPenilaian from "./ProfilPenilaian";
import { useParams } from "react-router";
import { getSubKategori } from "../../api/penilaian";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const SubKategoriPenilaian = () => {
    const { id_kategori, id_rekap_nilai } = useParams();
    const [subkategoriList, setSubKategoriList] = useState([]);
    const [pesertaDidik, setPesertaDidik] = useState(null);
    const [kategori, setKategori] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        setError("");
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await getSubKategori(id_rekap_nilai, id_kategori);
            const hasil = Array.isArray(response.data)
                ? response.data.map((item) => ({
                      id: item.id_sub_kategori,
                      status: item.status,
                      label: item.nama_sub_kategori,
                  }))
                : [];
            setKategori(response.data[0].kategori.nama_kategori);
            setSubKategoriList(hasil);
        } catch (error) {
            setError;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id_rekap_nilai) {
            fetchData();
        }
    }, [id_rekap_nilai]);

    useEffect(() => {
        const data = localStorage.getItem("pesertaDidik");
        if (data) {
            setPesertaDidik(JSON.parse(data));
        }
    }, []);

    return (
        <>
            <ModalPenilaian
                onClose={() => {
                    localStorage.removeItem("pesertaDidik");
                    navigate("/penilaian");
                }}
            >
                {error ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 rounded-lg border border-red-100 p-4">
                        <div className="flex items-center justify-center gap-2">
                            <svg
                                className="w-5 h-5 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h1 className="text-sm font-medium text-red-600">
                                {error}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <>
                        <ProfilPenilaian data={pesertaDidik} />
                        <div className=" font-semibold mb-5 w-1/2 p-3 flex justify-center items-center rounded-b-lg shadow-md">
                            <p className="text-sm text-slate-700">{kategori}</p>
                        </div>

                        <div className="mt-4 text-center text-sm text-gray-400">
                            <p>pilih sub kategori</p>
                        </div>
                        {isLoading && <Loading />}
                        <div className="flex flex-col items-center bg-white shadow-md rounded-2xl py-6 px-4 w-full max-w-md mx-auto space-y-3">
                            {subkategoriList.map((item, index) => (
                                <div
                                    onClick={() => {
                                        const dataLocalStorage = JSON.parse(
                                            localStorage.getItem("PesertaDidik")
                                        );
                                        console.log(
                                            "dataLocalStorage: ",
                                            dataLocalStorage
                                        );
                                        navigate(
                                            `/penilaian/${id_rekap_nilai}/${id_kategori}/${item.id}`
                                        );
                                    }}
                                    key={index}
                                    className={`${
                                        isLoading
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                    }  cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl shadow-sm`}
                                >
                                    <div className="flex justify-between w-full ">
                                        <p>{item.label}</p>
                                        {item.status == "belum lengkap" ? (
                                            <p className="text-red-500 font-bold">
                                                {"!"}
                                            </p>
                                        ) : (
                                            <p className="text-green-700 font-bold">
                                                ✓
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <div className="flex w-full h-full items-end ">
                    <StepProgress currentStep={2} />
                </div>
            </ModalPenilaian>
        </>
    );
};

export default SubKategoriPenilaian;
