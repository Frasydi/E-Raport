import ModalPenilaian from "./ModalPenilaian";
import ProfilPenilaian from "./ProfilPenilaian";
import StepProgress from "../StepProgres";
import ButtonSubmit from "../button/Button_submit";
import { getIndikator, updatePenilaian } from "../../api/penilaian";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import ConfirmModal from "../Modal/confirmModal";
import showToast from "../../hooks/showToast";
import { useFocusError } from "../../hooks/useFocusError";
import { useNavigate } from "react-router";
import ErrorMessage from "../Error";

const Nilai = () => {
    const { id_rekap_nilai, id_kategori, id_sub_kategori } = useParams();
    const navigate = useNavigate()
    const [kategoriList, setKategoriList] = useState([]);
    const [subKategori, setSubKategori] = useState("");
    const [kategori, setKategori] = useState("");
    const [pesertaDidik, setPesertaDidik] = useState(null);
    const [nilaiList, setNilaiList] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const { errorRef, focusError } = useFocusError();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emptyError, setEmptyError] = useState("");

    useEffect(() => {
        const data = localStorage.getItem("pesertaDidik");
        if (data) setPesertaDidik(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (error) {
            focusError();
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (id_rekap_nilai) {
            fetchData();
        }
    }, [id_rekap_nilai]);

    const fetchData = async () => {
        setIsLoading(true);
        setError("");
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await getIndikator(
                id_rekap_nilai,
                id_kategori,
                id_sub_kategori
            );

            const hasil = Array.isArray(response.data)
                ? response.data.map((item) => ({
                      id: item.indikator.id_indikator,
                      nilai: item.nilai || "",
                      label: item.indikator.nama_indikator,
                  }))
                : [];

            setKategoriList(hasil);
            setNilaiList(
                hasil.map((item) => ({
                    id_indikator: item.id,
                    nilai: item.nilai,
                }))
            );

            setSubKategori(
                response.data[0]?.indikator?.subKategori?.nama_sub_kategori ||
                    ""
            );
            setKategori(
                response.data[0]?.indikator?.subKategori?.kategori
                    ?.nama_kategori || ""
            );
        } catch (err) {
            setEmptyError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeNilai = (id, newValue) => {
        setNilaiList((prev) =>
            prev.map((item) =>
                item.id_indikator === id ? { ...item, nilai: newValue } : item
            )
        );
    };

    const handleOpen = (e) => {
        e.preventDefault();
        setConfirmModal(true);
    };
    const handleConfirm = async (e) => {
        setError("");
        setConfirmModal(false);
        setIsLoading(true);
        try {
            await updatePenilaian(id_rekap_nilai, id_sub_kategori, {
                nilai_list: nilaiList,
            });
            showToast("success", "Data berhasil disimpan");
        } catch (err) {
            setError(err || "gagal menyimpan data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setNilaiList((prev) =>
            prev.map((item) => ({
                ...item,
                nilai: "",
            }))
        );
    };

    return (
        <>
            <ModalPenilaian
                size="w-3xl h-11/12"
                onClose={() => {
                    localStorage.removeItem("pesertaDidik");
                    navigate("/penilaian");
                }}
            >
                {emptyError ? (
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
                                {emptyError}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <>
                        <ProfilPenilaian data={pesertaDidik} />

                        <div className="font-semibold w-1/2 p-3 flex justify-center items-center rounded-b-lg shadow-md">
                            <p className="text-sm text-slate-700">{kategori}</p>
                        </div>
                        <div className="w-11/12  max-w-6xl mx-auto py-2 mt-4  px-6 rounded-2xl space-y-8 flex flex-col justify-center">
                            {error && (
                                <ErrorMessage error={error} ref={errorRef} />
                            )}
                            <div className="font-semibold mb-5 w-1/2 p-3 flex justify-center items-center rounded-t-lg bg-slate-300 m-auto relative top-5">
                                <p className="text-sm text-slate-700 text-center">
                                    {subKategori}
                                </p>
                            </div>
                            {isLoading && <Loading />}

                            <div className="border border-slate-300 bg-white rounded-2xl shadow p-5 space-y-4">
                                <form className="space-y-3 flex flex-col gap-2">
                                    {kategoriList.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center gap-3"
                                        >
                                            <p className="text-sm text-slate-700 max-w-[85%]">
                                                {item.label}
                                            </p>
                                            <select
                                                disabled={isLoading}
                                                className="border border-slate-400 rounded-md px-3 py-1 text-sm font-semibold text-slate-700 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                                value={
                                                    nilaiList.find(
                                                        (n) =>
                                                            n.id_indikator ===
                                                            item.id
                                                    )?.nilai || ""
                                                }
                                                onChange={(e) =>
                                                    handleChangeNilai(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">kosong</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="P">P</option>
                                            </select>
                                        </div>
                                    ))}

                                    <div className="flex justify-between gap-3 pt-4  border-t-slate-400 px-5">
                                        <ButtonSubmit
                                            type="reset"
                                            bg="bg-gray-600 text-sm"
                                            hover="hover:bg-gray-700 w-15"
                                            onClick={handleReset}
                                            disabled={isLoading}
                                        >
                                            Reset
                                        </ButtonSubmit>
                                        <ButtonSubmit
                                            type="submit"
                                            bg="bg-teal-600"
                                            hover="hover:bg-teal-700 w-20 text-sm"
                                            onClick={handleOpen}
                                            disabled={isLoading}
                                        >
                                            Simpan
                                        </ButtonSubmit>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}
                <div className="flex w-full h-full items-end ">
                    <StepProgress currentStep={3} />
                </div>
            </ModalPenilaian>

            <ConfirmModal
                isOpen={confirmModal}
                title="Simpan Nilai?"
                text="Pastikan data sudah sesuai sebelum disimpan."
                onCancel={() => setConfirmModal(false)}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default Nilai;
