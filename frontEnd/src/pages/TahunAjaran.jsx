import LayoutMenu from "../containers/layout";
import { AddStudentButton } from "../component/button/Button";
import Search from "../component/input/Search";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useMemo } from "react";
import ModalAddTahun from "../component/Modal/ModalTahunAjaran/ModalAddTahun";
import ConfirmModal from "../component/Modal/confirmModal";
import ErrorMessage from "../component/Error";
import showToast from "../hooks/showToast";
import { useFocusError } from "../hooks/useFocusError";
import Loading from "../component/Loading";
import usePagination from "../hooks/usePagination";
import PaginationControls from "../component/PaginationControls";
import ModalEditTahun from "../component/Modal/ModalTahunAjaran/ModalEditTahun";
import ModernTable from "../component/table/modernTable";
import { useTahunAjaranStore } from "../stores/tahun-ajaran";

const TahunAjaran = () => {
    const { tahun_ajaran, loading, error, fetchData, deleteData } =
        useTahunAjaranStore();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [selectedTahun, setSelectedTahun] = useState("");
    const [emptyData, setEmptyData] = useState("");
    const { errorRef, focusError } = useFocusError();
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const displayData = useMemo(() => {
        let filtered = tahun_ajaran || [];
        if (search.trim()) {
            filtered = filtered.filter((item) =>
                item.tahun_ajaran.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (sortConfig.key) {
            filtered = [...filtered].sort((a, b) => {
                const valueA = a[sortConfig.key];
                const valueB = b[sortConfig.key];
                if (valueA < valueB)
                    return sortConfig.direction === "asc" ? -1 : 1;
                if (valueA > valueB)
                    return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [tahun_ajaran, search, sortConfig]);

    const {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
        resetPagination,
        startIndex,
    } = usePagination(displayData, 5);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (error) focusError();
    }, [error]);

    useEffect(() => {
        resetPagination();
    }, [search, sortConfig]);

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        if (!tahun_ajaran || tahun_ajaran.length == 0) {
            setEmptyData("data tahun ajara kosong, harap tambahkan data");
            return;
        }
        setEmptyData("");
        return;
    }, [tahun_ajaran]);

    const handleDelete = (id, tahun) => {
        setSelectedId(id);
        setSelectedTahun(tahun);
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        try {
            await deleteData(selectedId);
            showToast("success", "berhasil menghapus data");
        } catch (err) {
            showToast("error", "gagal menghapus data");
        } finally {
            setShowConfirm(false);
        }
    };

    const handleEdit = (id, tahun) => {
        setSelectedId(id);
        setSelectedTahun(tahun);
        setOpenEditModal(true);
    };

    const columns = [
        { header: "Tahun Ajaran", accessor: "tahun_ajaran", sortable: true },
    ];

    return (
        <>
            <ModalAddTahun
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={() => {
                    fetchData();
                    showToast("success", "data berhasil ditambahkan");
                }}
            />

            {openEditModal && (
                <ModalEditTahun
                    isOpen={openEditModal}
                    data={selectedTahun}
                    id_tahun_ajaran={selectedId}
                    onClose={() => setOpenEditModal(false)}
                    onSuccess={() => {
                        fetchData();
                        showToast("success", "data berhasil diubah");
                    }}
                />
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
                        <div>
                            <Search
                                htmlFor={"cari-tahun-ajaran"}
                                placeholder={"cari tahun ajaran"}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                    </div>

                    <div className="p-6 max-w-6xl mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
                            Data Tahun Ajaran
                        </h1>
                        {error &&
                            error != "data tidak ada, harap tambahkan data" && (
                                <ErrorMessage error={error} ref={errorRef} />
                            )}
                        {loading && <Loading />}

                        <ModernTable
                            columns={columns}
                            data={currentData}
                            emptyData={emptyData}
                            onDelete={(item) =>
                                handleDelete(
                                    item.id_tahun_ajaran,
                                    item.tahun_ajaran
                                )
                            }
                            onEdit={(item) =>
                                handleEdit(
                                    item.id_tahun_ajaran,
                                    item.tahun_ajaran
                                )
                            }
                            startIndex={startIndex}
                            onSort={handleSort}
                            sortConfig={sortConfig}
                        />

                        {tahun_ajaran && tahun_ajaran.length > 5 && (
                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            ></PaginationControls>
                        )}
                    </div>
                </div>
            </LayoutMenu>

            <ConfirmModal
                isOpen={showConfirm}
                onConfirm={handleConfirm}
                text={`Anda akan menghapus data tahun ajaran ${selectedTahun}. Apakah Anda yakin?`}
                title={`menghapus tahun ajaran`}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
};

export default TahunAjaran;
