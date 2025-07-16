import LayoutMenu from "../containers/layout";
import Container from "../containers/container";
import Search from "../component/input/Search";
import {
    faPlus,
    faDownload,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { AddStudentButton } from "../component/button/Button";
import Modal from "../component/Modal/ModalPesertaDidik/ModalAdd";
import CardProfil from "../component/card/cardProfil";
import ModalInput from "../component/input/ModalInput";
import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { usePesertaDidikStore } from "../stores/peserta-didik";
import { useSelectedTahunAjaran } from "../hooks/useSelectedTahunAjaran";
import Loading from "../component/Loading";
import showToast from "../hooks/showToast";
import ConfirmModal from "../component/Modal/confirmModal";
import ModalEditPesertaDidik from "../component/Modal/ModalPesertaDidik/ModalEditPeserta";

const PesertaDidik = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTahunAjaran, setSelectedTahunAjaran] = useState("");
    const [selectedPesertaId, setSelectedPesertaId] = useState("");
    const [selectedPesertaDidik, setSelectedPesertaDidik] = useState("");
    const [search, setSearch] = useState("");
    const { tahunAjaranOptions } = useSelectedTahunAjaran();
    const [showConfirm, setShowConfirm] = useState(false);
    const {
        pesertaDidik = [],
        loadingPeserta,
        errorPeserta,
        fetchByTahunAjaran,
        searchPeserta,
        deletePeserta,
    } = usePesertaDidikStore(
        useShallow((state) => ({
            pesertaDidik: state.data,
            loadingPeserta: state.loading,
            errorPeserta: state.error,
            fetchByTahunAjaran: state.fetchByTahunAjaran,
            searchPeserta: state.searchPeserta,
            deletePeserta: state.deletePeserta,
        }))
    );

    useEffect(() => {
        if (!selectedTahunAjaran) {
            return;
        }
        fetchByTahunAjaran(selectedTahunAjaran);
    }, [selectedTahunAjaran, fetchByTahunAjaran]);


    const handleEditPesertaDidik = (data) => {
        setSelectedPesertaDidik(data);
        setOpenEditModal(true);
    };

    const handleDelete = (peserta_didik_id, id_tahun_ajaran) => {
        setSelectedPesertaId(peserta_didik_id);
        setSelectedTahunAjaran(id_tahun_ajaran);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirm(false);
        try {
            await deletePeserta(selectedPesertaId, selectedTahunAjaran);
            showToast("success", "data berhasil di hapus");
        } catch (error) {
            showToast("error", "gagal menghapus peserta didik")
        }
    };

    const handleSearch = async () => {
        if (!search.trim()) {
            return;
        }
        await searchPeserta(search);
        setSelectedTahunAjaran("");
        setSearch("");
    };
    return (
        <>
            {openModal && (
                <Modal
                    CloseOpenModal={setOpenModal}
                    onClose={() => {
                        setOpenModal(false);
                        fetchByTahunAjaran(selectedTahunAjaran);
                    }}
                ></Modal>
            )}

            {openEditModal && (
                <ModalEditPesertaDidik
                    closeOpenModal={setOpenEditModal}
                    selectedPesertaDidik={selectedPesertaDidik}
                    tahunAjaranId={selectedTahunAjaran}
                    onClose={() => {
                        setOpenEditModal(false);
                        fetchByTahunAjaran(selectedTahunAjaran);
                    }}
                />
            )}
            <LayoutMenu blur={openModal || openEditModal}>
                <div className="w-5/6 mt-5">
                    {/* Dropdown Tahun Ajaran */}
                    <div className="w-72 text-sm pl-5 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5 z-10 relative">
                        <ModalInput
                            type={"select"}
                            value={selectedTahunAjaran}
                            onChange={(val) => {
                                setSelectedTahunAjaran(val);
                            }}
                            options={tahunAjaranOptions}
                            displayKey="label"
                            disibled={loadingPeserta}
                            emptyMessage={"harap isi data di menu tahun ajaran"}
                            valueKey="value"
                            id={"tahun_ajaran"}
                            name={"tahun_ajaran"}
                        >
                            Tahun Ajaran
                        </ModalInput>
                    </div>

                    {/* Tombol & Search */}
                    <Container>
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <AddStudentButton
                                    icon={faPlus}
                                    htmlFor={"add-data"}
                                    bg={"bg-teal-800/80 hover:bg-teal-800"}
                                    OnClick={() => {
                                        setOpenModal(true);
                                    }}
                                >
                                    tambahkan data
                                </AddStudentButton>
                                <AddStudentButton
                                    icon={faDownload}
                                    htmlFor={"download-data"}
                                    bg={"bg-cyan-800/80 hover:bg-cyan-800"}
                                >
                                    download data
                                </AddStudentButton>
                                <AddStudentButton
                                    icon={faUpload}
                                    htmlFor={"upload-data"}
                                    bg={"bg-rose-800/80 hover:bg-rose-800"}
                                >
                                    upload data
                                </AddStudentButton>
                            </div>
                            <div className="flex text-sm items-center gap-1.5 w-sm">
                                <Search
                                    htmlFor={"cari_peserta_didik"}
                                    placeholder={"cari peserta didik"}
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    onSearch={handleSearch}
                                ></Search>
                            </div>
                        </div>

                        {/* List CardProfil */}
                        {loadingPeserta && <Loading />}

                        {!loadingPeserta && errorPeserta && (
                            <div className="p-4 text-red-500">
                                {errorPeserta}
                            </div>
                        )}

                        {!loadingPeserta &&
                            !errorPeserta &&
                            pesertaDidik.length === 0 && (
                                <div className="p-4 text-gray-500">
                                    {selectedTahunAjaran
                                        ? "Tidak ada peserta didik untuk tahun ajaran ini."
                                        : "Harap pilih tahun ajaran atau cari peserta didik untuk melihat peserta didik."}
                                </div>
                            )}

                        {!loadingPeserta &&
                            !errorPeserta &&
                            pesertaDidik.length > 0 && (
                                <div className="flex flex-wrap gap-[42px] mt-15">
                                    {pesertaDidik.map((item) => (
                                        <CardProfil
                                            key={
                                                item.peserta_didik
                                                    .id_peserta_didik
                                            }
                                            data={item}
                                            onEditClick={() => {
                                                handleEditPesertaDidik({
                                                    peserta_didik:
                                                        item.peserta_didik,
                                                    id_guru: item.guru.id_guru,
                                                });
                                            }}
                                            onDeleteClick={() => {
                                                handleDelete(
                                                    item.peserta_didik
                                                        .id_peserta_didik,
                                                    item.tahun_ajaran
                                                        .id_tahun_ajaran
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                    </Container>
                </div>
            </LayoutMenu>
            <ConfirmModal
                isOpen={showConfirm}
                onConfirm={handleConfirmDelete}
                onCancel={()=> {
                    setShowConfirm(false)
                }}
                title={`hapus peserta didik`}
                text={"menghapus peserta didik dari tahun ajaran ini"}
            ></ConfirmModal>
        </>
    );
};

export default PesertaDidik;
