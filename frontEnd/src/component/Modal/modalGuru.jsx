import { useState, useRef, useEffect } from "react";
import { postDataGuru } from "../../api/guru_kelas";
import ConfirmModal from "./confirmModal";
import ErrorMessage from "../Error";
const ModalFormGuru = ({ isOpen, onClose, onSave }) => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({
        nama_guru: "",
        NUPTK: "",
        nama_kelas: "kelompok A",
    });

    const modalRef = useRef();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.nama_guru.trim() === "" || form.NUPTK.trim() === "") {
            setError("Silahkan lengkapi datanya terlebih dahulu");
            return;
        }
        if (!/^\d+$/.test(form.NUPTK)) {
            setError("NSIP hanya boleh berisi angka");
            return;
        }
        setError("");
        setShowConfirm(true);
    };

    const handleConfirm = async (e) => {
        setShowConfirm(false)
        setIsLoading(true)
        try {
            await postDataGuru(form);
            onSave();
            onClose();
            resetForm()
        } catch (error) {
            setError(error.message || "gagal menambahkan data");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setForm({
            nama_guru: "",
            NUPTK: "",
            nama_kelas: "kelompok A",
        });
    };

    const handleClose = () => {
        setError("");
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div
                    ref={modalRef}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in"
                >
                    <div className="flex justify-between items-center p-6 pb-0">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Tambah Data Guru
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col mt-3 w-11/12 px-6 p-1">
                        {error && <ErrorMessage error={error}></ErrorMessage>}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="px-6 mb-5 flex flex-col gap-4"
                    >
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Guru
                            </label>
                            <input
                                type="text"
                                name="nama_guru"
                                value={form.nama_guru}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                placeholder="Masukkan nama guru"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                NUPTK
                            </label>
                            <input
                                type="number"
                                name="NUPTK"
                                value={form.NUPTK}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                placeholder="Masukkan NUPTK"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Kelas
                            </label>
                            <select
                                name="nama_kelas"
                                value={form.nama_kelas}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                                disabled={isLoading}
                            >
                                <option value="kelompok A">Kelompok A</option>
                                <option value="kelompok B">Kelompok B</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 pt-6">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors font-medium shadow-sm flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    "Simpan data"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ConfirmModal
                isOpen={showConfirm}
                onConfirm={handleConfirm}
                title={"Simpan Data"}
                text={"Pastikan data sudah benar"}
                onCancel={()=> setShowConfirm(false)}
            />
        </>
    );
};

export default ModalFormGuru;
