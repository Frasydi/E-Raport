import { useEffect } from "react";

const ConfirmModal = ({ isOpen, onCancel, onConfirm, title, text }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/25 flex items-end justify-center p-4 sm:items-center">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-md shadow-2xl animate-slide-up">
                <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="w-6 h-6 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-500 mb-6">{text}</p>

                    <div className="flex gap-3 w-full">
                        <button
                            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-all"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all shadow hover:shadow-md"
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
