import ModalPenilaian from "./ModalPenilaian";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StepProgress from "../StepProgres";
import ProfilPenilaian from "./ProfilPenilaian";
import { useParams } from "react-router";
import { getKategori } from "../../api/penilaian";
import { useNavigate } from "react-router";
import Loading from "../Loading";
import {
    faHeart,
    faRunning,
    faBrain,
    faLanguage,
    faSmile,
    faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const KategoriPenilaian = () => {
    const { id_rekap_nilai } = useParams();
    const [kategoriList, setKategoriList] = useState([]);
    const [isLoading, setIsLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dataPesertaDidik = kategoriList[0]?.peserta_didik;
    const icon = [
        faHeart,
        faRunning,
        faBrain,
        faLanguage,
        faSmile,
        faPaintBrush,
    ];

    console.log(dataPesertaDidik);

    const fetchData = async () => {
        setIsLoading(true);
        setError("");
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await getKategori(id_rekap_nilai);
            const hasil = Array.isArray(response.data)
                ? response.data.map((item, index) => ({
                      status: item.status,
                      id: item.id_kategori,
                      label: item.nama_kategori,
                      icon: icon[index % icon.length],
                      peserta_didik: item.peserta_didik,
                  }))
                : [];

            setKategoriList(hasil);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id_rekap_nilai) {
            fetchData();
        }
    }, [id_rekap_nilai]);

    return (
        <ModalPenilaian
            onClose={() => {
                localStorage.removeItem("pesertaDidik");
                navigate("/menu/penilaian");
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
                    <ProfilPenilaian
                        data={dataPesertaDidik}
                        isLocalStorage={true}
                    />
                    <div className="mt-4 text-center text-sm text-gray-400">
                        <p> Pilih kategori</p>
                    </div>
                    <div className="flex flex-col h-full items-center justify-center bg-white shadow-md rounded-2xl py-6 px-4 w-full max-w-md mx-auto space-y-3">
                        {isLoading && <Loading />}
                        {kategoriList.map((item, index) => (
                            <div
                                onClick={() => {
                                    localStorage.setItem(
                                        "pesertaDidik",
                                        JSON.stringify(dataPesertaDidik)
                                    );
                                    if(item.label == 'Nilai Nilai Agama dan Moral') {
                                        navigate(`/menu/penilaian/${id_rekap_nilai}/${item.id}/${item.id}`)
                                    } else {
                                        navigate(
                                            `/menu/penilaian/${id_rekap_nilai}/${item.id}`
                                        );
                                    }
                                    console.log(item.label)
                                }}
                                key={index}
                                className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl shadow-sm"
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="text-gray-600 w-5"
                                />
                                <div className="flex justify-between w-full ">
                                    <p>{item.label}</p>
                                    {item.status == 'belum lengkap'?(<p className="text-red-500 font-bold">{'!'}</p>) : (<p className="text-green-700 font-bold">✓</p>)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full h-full items-end ">
                        <StepProgress currentStep={1} />
                    </div>
                </>
            )}
        </ModalPenilaian>
    );
};

export default KategoriPenilaian;
