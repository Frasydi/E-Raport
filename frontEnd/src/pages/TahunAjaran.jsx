import LayoutMenu from "../containers/layout";
import { AddStudentButton } from "../component/button/Button";
import Search from "../component/input/Search";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getTahunAjaran } from "../api/tahun_ajaran";
import { useEffect, useState } from "react";
import ModalAddTahun from "../component/Modal/ModalTahunAjaran/ModalAddTahun";
import ConfirmModal from "../component/Modal/confirmModal";
import { deleteTahunAjaran } from "../api/tahun_ajaran";
import ErrorMessage from "../component/Error";
import showToast from "../hooks/showToast";
import { useFocusError } from "../hooks/useFocusError";
import Loading from "../component/Loading";
import usePagination from "../hooks/usePagination";
import PaginationControls from "../component/PaginationControls";
import ModalEditTahun from "../component/Modal/ModalTahunAjaran/ModalEditTahun";
import { searchDataTahun } from "../api/tahun_ajaran";
import ModernTable from "../component/table/modernTable";

const TahunAjaran = () => {
    const [originalData, setOriginalData] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [selectedTahun, setSelectedTahun] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [emptyData, setEmptyData] = useState("");
    const [isError, setIsError] = useState("");
    const { errorRef, focusError } = useFocusError();
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [search, setSearch] = useState("");

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        const sorted = [...originalData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setOriginalData(sorted);
    };

    const columns = [
        { header: "Tahun Ajaran", accessor: "tahun_ajaran", sortable: true },
    ];

    const {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
        resetPagination,
        startIndex,
    } = usePagination(originalData, 5);

    useEffect(() => {
        if (isError) {
            focusError();
        }
    }, [isError]);
    console.log(emptyData)

    const fetchData = async () => {
        setIsloading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setEmptyData("");
            const result = await getTahunAjaran();
            setOriginalData(result.data);
        } catch (error) {
            setEmptyData('data belum ada, harap tambahkan data');
        } finally {
            setIsloading(false);
        }
    };

    const handleDelete = async (id_tahun_ajaran, tahun_ajaran) => {
        setSelectedId(id_tahun_ajaran);
        setSelectedTahun(tahun_ajaran);
        setShowConfirm(true);
    };

    useEffect(() => {
        if (search.length == 0) {
            fetchData();
        }
    }, [search]);

    const handleSearch = async () => {
        setIsloading(true);
        setIsError("");
        if (!search.trim()) {
            setIsloading(false);
            return;
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await searchDataTahun(search);
            setOriginalData(response.data);
            resetPagination();
        } catch (error) {
            setIsError(error || "gagal search");
        } finally {
            setIsloading(false);
        }
    };

    const handleConfirm = async () => {
        setIsloading(true);
        setIsError("");
        try {
            await deleteTahunAjaran(selectedId);
            setShowConfirm(false);
            showToast("success", "berhasil menghapus data");
            await fetchData();
        } catch (error) {
            setIsError(error);
            setShowConfirm(false);
            showToast("error", "gagal menghapus data");
        } finally {
            setIsloading(false);
        }
    };

    const handleEdit = async (id_tahun_ajaran, data) => {
        setSelectedId(id_tahun_ajaran);
        setSelectedTahun(data);
        setOpenEditModal(true);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <ModalAddTahun
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false);
                }}
                onSuccess={async () => {
                    await fetchData();
                    showToast("success", "data berhasil ditambahkan");
                }}
            />

            {openEditModal && (
                <ModalEditTahun
                    isOpen={openEditModal}
                    data={selectedTahun}
                    id_tahun_ajaran={selectedId}
                    onClose={() => {
                        setOpenEditModal(false);
                    }}
                    onSuccess={async () => {
                        await fetchData();
                        showToast("success", "data berhasil ditambahkan");
                    }}
                ></ModalEditTahun>
            )}
            <LayoutMenu>
                <div className="w-5/6 mt-10 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5 text-sm">
                    <div className="flex justify-between">
                        <AddStudentButton
                            icon={faPlus}
                            htmlFor={"add-data"}
                            bg={"bg-teal-800/80 hover:bg-teal-800"}
                            OnClick={() => setOpenModal(true)}
                        >
                            tambahkan data
                        </AddStudentButton>
                        <div className="flex text-sm items-center gap-1.5">
                            <Search
                                htmlFor={"cari-tahun-ajaran"}
                                placeholder={"cari tahun ajaran"}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                onSearch={handleSearch}
                                value={search}
                            />
                        </div>
                    </div>
                    <div className="p-6 max-w-6xl mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
                            Data Tahun AJaran
                        </h1>
                        {isError && (
                            <ErrorMessage error={isError} ref={errorRef} />
                        )}
                        {isLoading && <Loading />}

                        {/* table */}
                        <ModernTable
                            columns={columns}
                            data={currentData}
                            emptyData={emptyData}
                            onDelete={(item) => {
                                handleDelete(
                                    item.id_tahun_ajaran,
                                    item.tahun_ajaran
                                );
                            }}
                            onEdit={(item) => {
                                handleEdit(
                                    item.id_tahun_ajaran,
                                    item.tahun_ajaran
                                );
                            }}
                            startIndex={startIndex}
                            onSort={handleSort}
                            sortConfig={sortConfig}
                        />
                        {/* Pagination */}
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </LayoutMenu>
            <ConfirmModal
                isOpen={showConfirm}
                onConfirm={handleConfirm}
                text={`Anda akan menghapus data tahun ajaran ${selectedTahun}. Apakah Anda yakin? `}
                title={`menghapus tahun ajaran`}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
};

export default TahunAjaran;
