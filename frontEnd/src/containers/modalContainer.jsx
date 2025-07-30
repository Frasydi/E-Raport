import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalContainer = ({ children, onClose, size, height }) => {
    return (
        <div className="w-full bg-gray-900/50 bg z-50 fixed top-0 flex justify-center h-screen backdrop-blur-sm">
            <div
                className={`flex ${size} flex-col items-center  drop-shadow-xl rounded-2xl bg-white mt-5 pb-10 ${height} overflow-auto relative`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-1 hover:bg-gray-100/50 rounded-full transition-colors duration-200 focus:outline-none"
                    aria-label="Close modal"
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
                    />
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalContainer;
