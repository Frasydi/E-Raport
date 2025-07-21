import LayoutMenu from "../containers/layout";
import Container from "../containers/container";
import Search from "../component/input/Search";
import CardProfil from "../component/card/cardProfil";
import ModalInput from "../component/input/ModalInput";
import { useSelectedTahunAjaran } from "../hooks/useSelectedTahunAjaran";
import { getByTahunSemester } from "../api/penilaian";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ErrorMessage from "../component/Error";
import Loading from "../component/Loading";

const Penilaian = () => {
    const { tahunAjaranOptions } = useSelectedTahunAjaran();
    const [selectedTahunAjaran, setSelectedTahunAjaran] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [pesertaDidik, setPesertaDidik] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await getByTahunSemester(
                selectedTahunAjaran,
                selectedSemester
            );
            setError("");
            const newData = response.data.map((item) => {
                return {
                    id_rekap_nilai: item.id_rekap_nilai,
                    peserta_didik: item.pesertaDidik,
                    tahun_ajaran: item.tahunAjaran,
                    guru: item.guru,
                };
            });
            setPesertaDidik(newData);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedTahunAjaran) {
            setError(
                "tahun ajaran belum dipilih. Harap lengkapi terlebih dahulu"
            );
            return;
        }
        if (!selectedSemester) {
            setError("semester belum dipilih. Harap lengkapi terlebih dahulu");
            return;
        }
        fetchData();
    }, [selectedSemester, selectedTahunAjaran]);

    return (
        <LayoutMenu>
            <Outlet />
            <div className="w-5/6 mt-10">
                <div className="w-2xl text-sm px-5 drop-shadow-xl rounded-xl bg-[#ffffff] pt-4 z-10 relative flex gap-7">
                    <ModalInput
                        type={"select"}
                        classname={"mb-5"}
                        value={selectedTahunAjaran}
                        onChange={(val) => {
                            setSelectedTahunAjaran(val);
                        }}
                        options={tahunAjaranOptions}
                        displayKey="label"
                        //disibled={loadingPeserta}
                        emptyMessage={"harap isi data di menu tahun ajaran"}
                        valueKey="value"
                        id={"tahun_ajaran"}
                        name={"tahun_ajaran"}
                    >
                        Tahun Ajaran
                    </ModalInput>
                    <ModalInput
                        type={"select"}
                        value={selectedSemester}
                        onChange={(val) => {
                            setSelectedSemester(val);
                        }}
                        options={["semester 1", "semester 2"]}
                        displayKey="label"
                        valueKey="value"
                        id={"semester"}
                        name={"semester"}
                    >
                        Semester
                    </ModalInput>
                </div>
                <Container>
                    {isLoading && <Loading />}
                    <div className="flex items-center justify-between mb-6">
                        <div className="inline-flex items-center bg-[#484848] text-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                            <svg
                                className="w-4 h-4 mr-2 text-blue-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            Instruksi: pilih semester dan tahun ajaran
                        </div>
                        <div className="w-sm">
                            <Search
                                htmlFor="search_student"
                                placeholder="cari siswa....."
                                label={false}
                            />
                        </div>
                    </div>

                    {error ? (
                        <div className="w-full flex flex-col items-center justify-center h-52 bg-red-50 rounded-lg border border-red-100 p-4">
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
                        <div className="flex flex-wrap gap-[61px] ">
                            {pesertaDidik.map((item) => (
                                <CardProfil
                                    key={item.id_rekap_nilai}
                                    mode="penilaian"
                                    data={item}
                                    onNilaiClick={(data) => {
                                        navigate(`${data.id_rekap_nilai}`);
                                    }}
                                ></CardProfil>
                            ))}
                        </div>
                    )}
                </Container>
            </div>
        </LayoutMenu>
    );
};

export default Penilaian;
