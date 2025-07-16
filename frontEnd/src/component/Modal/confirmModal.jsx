import { useEffect, useState } from "react";

const ConfirmModal = ({ isOpen, onCancel, onConfirm, title, text }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                onClick={onCancel}
            />

            {/* Modal dengan animasi mirip SweetAlert2 */}
            <div
                className={`bg-white rounded-xl p-6 w-full max-w-md shadow-xl transition-all duration-300 transform ${
                    isVisible ? "animate-swal2-show" : "animate-swal2-hide"
                }`}
            >
                <div className="flex flex-col items-center text-center">
                    {/* Icon dengan animasi */}
                    <div className="swal2-icon animate-bounceIn mb-4">
                        <div className="swal2-icon-content">!</div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-500 mb-6">{text}</p>

                    <div className="flex gap-3 w-full">
                        <button
                            className="flex-1 px-4 py-2.5 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-all duration-200"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200 shadow hover:shadow-md"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
