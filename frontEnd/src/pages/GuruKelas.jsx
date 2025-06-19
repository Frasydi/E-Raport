import LayoutMenu from "../containers/layout";
import { getGuruKelas, deleteData } from "../api/guru_kelas";
import {
    faPlus,
    faSortUp,
    faSortDown,
    faSort,
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddStudentButton } from "../component/button/Button";
import Search from "../component/input/Search";
import { useEffect, useState } from "react";
import ModalFormGuru from "../component/Modal/modalGuru";
import Swal from "sweetalert2";
import useSortableData from "../hooks/useSortableData";
import showToast from "../hooks/showToast";
import ModalEditGuru from "../component/Modal/ModalEditGuru";

const GuruKelas = () => {
    const [originalData, setOriginalData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [error, setError] = useState("");
    const {
        items: data,
        requestSort,
        getSortDirection,
    } = useSortableData(originalData);

    const fetchData = async () => {
        try {
            const result = await getGuruKelas();
            setError("");
            setOriginalData(result);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getSortIcon = (key) => {
        const direction = getSortDirection(key);
        if (!direction) return faSort;
        return direction === "asc" ? faSortUp : faSortDown;
    };

    const handleEdit = (teacher) => {
        setSelectedTeacher(teacher);
        setOpenEditModal(true);
    };
    const handleDelete = async (id_guru) => {
        const { isConfirmed } = await Swal.fire({
            title: "Hapus Data Guru?",
            text: "Data yang dihapus tidak dapat dikembalikan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        });
        if (!isConfirmed) {
            return;
        }

        try {
            Swal.fire({
                title: "Menghapus Data...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            await deleteData(id_guru);
            setOriginalData((prev) =>
                prev.filter((item) => item.id_guru !== id_guru)
            );

            Swal.fire({
                icon: "success",
                title: "Berhasil Dihapus!",
                text: "Data guru telah dihapus",
                confirmButtonColor: "#0e7490",
                timer: 2000,
                timerProgressBar: true,
                willClose: () => {
                    showToast("error", "Data berhasil dihapus"), fetchData();
                },
            });
        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: error.message || "Gagal menghapus data guru",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleSaveGuru = async () => {
        fetchData();
        showToast("success", "data berhasil ditambahkan")
    };

    const handleUpdateGuru = async () => {
        try {
            const result = await getGuruKelas();
            setOriginalData(result);
            showToast("success", "Data berhasil diperbarui");
        } catch (error) {
            showToast("error", error.message || "Gagal memperbarui data");
        }
    };

    return (
        <>
            <ModalFormGuru
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleSaveGuru}
            />
            {selectedTeacher && (
                <ModalEditGuru
                    isOpen={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                    onSave={handleUpdateGuru}
                    teacherData={selectedTeacher}
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
                        <div className="flex text-sm items-center gap-1.5">
                            <Search
                                htmlFor={"cari-guru"}
                                placeholder={"cari guru"}
                            />
                        </div>
                    </div>

                    <div className="p-6 max-w-6xl mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
                            📚 Data Guru TK
                        </h1>
                        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">
                            {error ? (
                                <div className="h-54 flex justify-center items-center">
                                    <h1 className="text-xl text-gray-800 font-semi-bold">
                                        {error}
                                    </h1>
                                </div>
                            ) : (
                                <table className="min-w-full text-sm text-gray-700">
                                    <thead className="bg-sky-800 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left">
                                                No
                                            </th>
                                            <th
                                                className="px-6 py-4 text-left cursor-pointer"
                                                onClick={() =>
                                                    requestSort("nama_guru")
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                                                    Nama Guru{" "}
                                                    <FontAwesomeIcon
                                                        icon={getSortIcon(
                                                            "nama_guru"
                                                        )}
                                                    />
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-4 text-left cursor-pointer"
                                                onClick={() =>
                                                    requestSort("NSIP")
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                                                    NSIP{" "}
                                                    <FontAwesomeIcon
                                                        icon={getSortIcon(
                                                            "NSIP"
                                                        )}
                                                    />
                                                </div>
                                            </th>
                                            <th
                                                className="px-6 py-4 text-left cursor-pointer"
                                                onClick={() =>
                                                    requestSort("nama_kelas")
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                                                    Kelas{" "}
                                                    <FontAwesomeIcon
                                                        icon={getSortIcon(
                                                            "nama_kelas"
                                                        )}
                                                    />
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((teacher, index) => (
                                            <tr
                                                key={teacher.id_guru}
                                                className={`border-b ${
                                                    index % 2 === 0
                                                        ? "bg-gray-50"
                                                        : "bg-white"
                                                } hover:bg-blue-50 transition duration-150`}
                                            >
                                                <td className="px-6 py-4">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {teacher.nama_guru}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {teacher.NSIP}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {teacher.nama_kelas}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    teacher
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faPen}
                                                            />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    teacher.id_guru
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </LayoutMenu>
        </>
    );
};

export default GuruKelas;
