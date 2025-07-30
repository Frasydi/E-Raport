import ModalContainer from "../../../containers/modalContainer";
import Search from "../../input/Search";
import { getPesertaDidik } from "../../../api/peserta_didik";
import ButtonSubmit from "../../button/Button_submit";
import { useEffect, useState } from "react";
import { getSearchPesertaDidik } from "../../../api/peserta_didik";
import ErrorMessage from "../../Error";
import Loading from "../../Loading";
import usePagination from "../../../hooks/usePagination";
import PaginationControls from "../../PaginationControls";

const ModalSelectPeserta = ({ isOpen, closeOpenModal, onSelect }) => {
    const [allData, setAllData] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");

    const handleRowClick = (id_peserta_didik) => {
        setSelectedId(
            id_peserta_didik === selectedId ? null : id_peserta_didik
        );
    };
    const {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
        resetPagination,
        startIndex,
    } = usePagination(allData, 5);

    const fetchData = async () => {
        try {
            const response = await getPesertaDidik();
            setAllData(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePilihClick = () => {
        const selectedItem = allData.find(
            (item) => item.id_peserta_didik === selectedId
        );
        if (selectedItem) {
            onSelect({
                nama_lengkap: selectedItem.nama_lengkap,
                nama_panggilan: selectedItem.nama_panggilan,
                nis: selectedItem.nis,
                nisn: selectedItem.nisn,
                tempat_lahir: selectedItem.tempat_lahir,
                tanggal_lahir: selectedItem.tanggal_lahir,
                jenis_kelamin: selectedItem.jenis_kelamin,
                agama: selectedItem.agama,
                anakKe: selectedItem.anakKe,
                nama_ayah: selectedItem.nama_ayah,
                pekerjaanAyah: selectedItem.pekerjaanAyah,
                nama_ibu: selectedItem.nama_ibu,
                pekerjaanIbu: selectedItem.pekerjaanIbu,
                nama_wali: selectedItem.nama_wali,
                provinsi: selectedItem.provinsi,
                kabupaten: selectedItem.kabupaten,
                kecamatan: selectedItem.kecamatan,
                desa_atau_kelurahan: selectedItem.desa_atau_kelurahan,
                jalan: selectedItem.jalan,
            });
            return;
        }
        setIsError("harap pilih peserta didik");
    };

    //samapi disini
    const handleClickSearch = async () => {
        setIsLoading(true);
        setIsError("");
        try {
            if (!search || search.length == 0) return;
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await getSearchPesertaDidik(search);
            setAllData(response);
            setSelectedId(null);
            resetPagination();
        } catch (error) {
            setIsError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (search.length == 0) {
            fetchData();
        }
    }, [search]);

    return (
        <ModalContainer
            size={"w-5/12 self-center"}
            height={"h-[80%]"}
            onClose={closeOpenModal}
        >
            <div className="p-5 flex flex-col h-full w-8/12">
                <div className="flex w-full justify-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        PESERTA DIDIK
                    </h2>
                </div>

                <div className="mb-4">
                    <Search
                        placeholder={"cari nama lengkap atau nis"}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        onSearch={handleClickSearch}
                    />
                </div>
                {isLoading && <Loading></Loading>}
                {isError && <ErrorMessage error={isError}></ErrorMessage>}

                <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto flex-1">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        NIS
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentData.map((item) => (
                                    <tr
                                        key={item.id_peserta_didik}
                                        className={`hover:bg-gray-50 cursor-pointer ${
                                            selectedId === item.id_peserta_didik
                                                ? "bg-blue-50"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleRowClick(
                                                item.id_peserta_didik
                                            )
                                        }
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.nama_lengkap}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                            {item.nis}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-center">
                                            <input
                                                type="radio"
                                                name="aksi"
                                                checked={
                                                    selectedId ===
                                                    item.id_peserta_didik
                                                }
                                                onChange={() =>
                                                    setSelectedId(
                                                        item.id_peserta_didik
                                                    )
                                                }
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />

                    {/* Button */}
                </div>
                <div className="w-full flex justify-center mt-5">
                    <ButtonSubmit
                        children={"Pilih"}
                        onClick={handlePilihClick}
                        bg={"bg-emerald-500 w-8/12 center"}
                        hover={"hover:bg-emerald-600"}
                    ></ButtonSubmit>
                </div>
            </div>
        </ModalContainer>
    );
};

export default ModalSelectPeserta;
