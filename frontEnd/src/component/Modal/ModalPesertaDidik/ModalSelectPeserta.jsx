import ModalContainer from "../../../containers/modalContainer";
import Search from "../../input/Search";
import { getPesertaDidik } from "../../../api/peserta_didik";
import ButtonSubmit from "../../button/Button_submit";
import { useEffect, useState } from "react";
import { getSearchPesertaDidik } from "../../../api/peserta_didik";
import { useShallow } from "zustand/react/shallow";
import ErrorMessage from "../../Error";
import Loading from "../../Loading";

const ModalSelectPeserta = ({ isOpen, closeOpenModal, onSelect }) => {
    const [allData, setAllData] = useState([]);
    const [search, setSearch] = useState("");
    console.log("search: ", search);
    const [selectedId, setSelectedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    const itemsPerPage = 10;

    // Calculate pagination
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = allData.slice(startIndex, startIndex + itemsPerPage);

    const handleRowClick = (id_peserta_didik) => {
        setSelectedId(
            id_peserta_didik === selectedId ? null : id_peserta_didik
        );
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
            if(!search || search.length == 0) return
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await getSearchPesertaDidik(search);
            setAllData(response);
            setSelectedId(null);
            setCurrentPage(1);
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
            CloseOpenModal={closeOpenModal}
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
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{" "}
                                    <span className="font-medium">
                                        {startIndex + 1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium">
                                        {Math.min(
                                            startIndex + itemsPerPage,
                                            allData.length
                                        )}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium">
                                        {allData.length}
                                    </span>{" "}
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    {/* Page numbers */}
                                    {Array.from(
                                        { length: Math.min(5, totalPages) },
                                        (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (
                                                currentPage >=
                                                totalPages - 2
                                            ) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() =>
                                                        handlePageChange(
                                                            pageNum
                                                        )
                                                    }
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        currentPage === pageNum
                                                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        }
                                    )}

                                    <button
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg
                                            className="h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>

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
