import LayoutMenu from "../containers/layout";
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
import { useState } from "react";

const initialData = [
    { id: 1, name: "Ahmad Sulaiman", nsip: "NSIP001", class: "TK A" },
    { id: 2, name: "Nur Aisyah", nsip: "NSIP002", class: "TK B" },
    { id: 3, name: "Rahmawati", nsip: "NSIP003", class: "TK A" },
    { id: 4, name: "Fatma Yani", nsip: "NSIP004", class: "TK C" },
];

const GuruKelas = () => {
    const [data, setData] = useState(initialData);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const sortBy = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sorted = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setData(sorted);
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return faSort;
        return sortConfig.direction === "asc" ? faSortUp : faSortDown;
    };

    const handleEdit = (id) => {
        alert(`Edit data ID ${id}`);
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            setData(data.filter((item) => item.id !== id));
        }
    };

    return (
        <LayoutMenu>
            <div className="w-5/6 mt-10 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5 text-sm">
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
                    </div>
                    <div className="flex text-sm items-center gap-1.5">
                        <Search
                            htmlFor={"cari-guru"}
                            placeholder={"cari guru"}
                        ></Search>
                    </div>
                </div>
                <div className="p-6 max-w-6xl mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-700 mb-6">
                        📚 Data Guru TK
                    </h1>
                    <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th
                                        className="px-6 py-4 text-left cursor-pointer"
                                        onClick={() => sortBy("id")}
                                    >
                                        <div className="flex items-center gap-2">
                                            No{" "}
                                            <FontAwesomeIcon
                                                icon={getSortIcon("id")}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left cursor-pointer"
                                        onClick={() => sortBy("name")}
                                    >
                                        <div className="flex items-center gap-2">
                                            Nama Guru{" "}
                                            <FontAwesomeIcon
                                                icon={getSortIcon("name")}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left cursor-pointer"
                                        onClick={() => sortBy("nsip")}
                                    >
                                        <div className="flex items-center gap-2">
                                            NSIP{" "}
                                            <FontAwesomeIcon
                                                icon={getSortIcon("nsip")}
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left cursor-pointer"
                                        onClick={() => sortBy("class")}
                                    >
                                        <div className="flex items-center gap-2">
                                            Kelas{" "}
                                            <FontAwesomeIcon
                                                icon={getSortIcon("class")}
                                            />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((teacher, index) => (
                                    <tr
                                        key={teacher.id}
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
                                            {teacher.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {teacher.nsip}
                                        </td>
                                        <td className="px-6 py-4">
                                            {teacher.class}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(teacher.id)
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
                                                        handleDelete(teacher.id)
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
                    </div>
                </div>
            </div>
        </LayoutMenu>
    );
};

export default GuruKelas;
