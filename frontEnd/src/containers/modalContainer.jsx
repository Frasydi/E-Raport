import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const ModalContainer = ({ children, CloseOpenModal }) => {
    return (
        <div className="w-full bg-gray-900/50 z-50 fixed top-0 flex justify-center h-screen">
            <div className="flex flex-col items-center drop-shadow-xl rounded-2xl bg-[#ffffff] w-6/12 mt-5 pb-10 h-[95%] overflow-auto">
                <FontAwesomeIcon
                    icon={faXmark}
                    className="text-2xl absolute top-3 right-3 text-gray-800/80 hover:text-gray-800 cursor-pointer"
                    onClick={() => {
                        CloseOpenModal(false);
                    }}
                ></FontAwesomeIcon>
                {children}
            </div>
        </div>
    );
};

export default ModalContainer;
