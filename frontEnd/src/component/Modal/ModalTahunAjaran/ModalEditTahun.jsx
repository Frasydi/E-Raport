import { useState, useEffect } from "react";
import ConfirmModal from "../confirmModal";
import { updateTahunAjaran } from "../../../api/tahun_ajaran";
import ErrorMessage from "../../Error";
import showToast from "../../../hooks/showToast";

const ModalEditTahun = ({ isOpen, onClose, id_tahun_ajaran, data, onSuccess }) => {
    const [form, setForm] = useState({ tahun_ajaran: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Sync data setiap kali modal dibuka atau data berubah
    useEffect(() => {
        if (data) {
            setForm({ tahun_ajaran: data });
        }
        setError("");
    }, [data, isOpen]);

    const handleClose = () => {
        setForm({ tahun_ajaran: "" });
        setError("");
        onClose();
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.tahun_ajaran.trim()) {
            setError("Tahun ajaran tidak boleh kosong");
            return;
        }
        setError("");
        setShowConfirm(true);
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        setIsLoading(true);
        try {
            await updateTahunAjaran(form, id_tahun_ajaran);
            showToast("success", "Data berhasil di edit");
            onSuccess()
            onClose()
        } catch (err) {
            setError(err || "Gagal edit data");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                    <div className="flex justify-between items-center p-6 pb-0">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Edit Tahun Ajaran
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

                    <div className="flex flex-col mt-3 w-11/12 px-6">
                        {error && <ErrorMessage error={error} />}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="px-6 mb-5 flex flex-col gap-4"
                    >
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Tahun Ajaran
                            </label>
                            <input
                                type="text"
                                name="tahun_ajaran"
                                value={form.tahun_ajaran}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                placeholder="contoh: 2025/2026"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-6">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-5 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                                disabled={isLoading}
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
                                    "Simpan Data"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ConfirmModal
                title="Update Data"
                text="Pastikan data sudah benar."
                isOpen={showConfirm}
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
};

export default ModalEditTahun;
