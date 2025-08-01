import { useState, useRef, useEffect } from "react";
import ConfirmModal from "../confirmModal";
import ModalInput from "../../input/ModalInput";
import ButtonSubmit from "../../button/Button_submit";
import { updateKesimpulan, getKesimpulan } from "../../../api/kesimpulan";
import showToast from "../../../hooks/showToast";
import ErrorMessage from "../../Error";
import ButtonSpinLoading from "../../button/ButtonSpinLoading";

const ModalKesimpulan = ({ isOpen, onClose, data }) => {
    const [showConfirmModal, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        saran_dan_masukan: "",
    });
    const handleClose = () => {
        onClose();
    };

    const fetchData = async () => {
        setError("");
        try {
            const response = await getKesimpulan(data);
            setForm({
                saran_dan_masukan: response?.saran_dan_masukan,
            });
        } catch (error) {
            setError(error.message || "terjadi kesalahan");
        }
    };
    useEffect(() => {
        fetchData();
    }, [isOpen, data]);

    const handleConfirm = async () => {
        setShowConfirm(false);
        setError("");
        setIsLoading(false);
        try {
            await updateKesimpulan(data, form);
            showToast("success", "data berhasil disimpan");
        } catch (error) {
            setError(error.message || "Kesahan Server");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                    <div className="flex justify-between items-center p-6 pb-0">
                        <h2 className="text-lg font-bold text-gray-800">
                            Masukkan Saran Dan Masukan
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

                    {error && (
                        <div className="w-full px-4 mt-2">
                            <ErrorMessage error={error} />
                        </div>
                    )}
                    <form className="px-6 pb-6 mt-4">
                        <ModalInput
                            id={"saran_dan_masukan"}
                            value={form.saran_dan_masukan || ""}
                            type={"textarea"}
                            name={"saran_dan_masukan"}
                            placeholder={"ketik saran dan masukan"}
                            htmlFor={"saran_dan_masukan"}
                            onChange={(e) => {
                                setForm({
                                    saran_dan_masukan: e.target.value,
                                });
                            }}
                        >
                            saran dan masukan{" "}
                        </ModalInput>
                        <div className="flex gap-2 mt-5 w-1/2 justify-start">
                            <ButtonSubmit
                                bg={"bg-teal-600"}
                                type={"submit"}
                                hover={"hover:bg-teal-700 w-20"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowConfirm(true);
                                }}
                                disabled={isLoading}
                            >
                                {" "}
                                {isLoading ? (
                                    <ButtonSpinLoading
                                        size="sm"
                                        color="light"
                                    />
                                ) : (
                                    "simpan"
                                )}
                            </ButtonSubmit>
                            <ButtonSubmit
                                type={"reset"}
                                bg={"bg-gray-600"}
                                hover={"hover:bg-gray-700 w-15"}
                                onClick={() => {
                                    setForm({
                                        saran_dan_masukan: "",
                                    });
                                }}
                                disabled={isLoading}
                            >
                                reset
                            </ButtonSubmit>
                        </div>
                    </form>
                </div>
            </div>
            {showConfirmModal && (
                <ConfirmModal
                    isOpen={showConfirmModal}
                    onConfirm={handleConfirm}
                    text={"pastikan data sudah benar!"}
                    title={"Simpan Data?"}
                    onCancel={() => {
                        setShowConfirm(false);
                    }}
                />
            )}
        </>
    );
};

export default ModalKesimpulan;
