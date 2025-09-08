import ModalContainer from "../../containers/modalContainer";
const ModalPenilaian = ({ children, size = "w-2xl h-full md:h-11/12" , onClose}) => {
    return (
        <ModalContainer size={size} onClose={onClose} height={"m-0"}>
            {children}
        </ModalContainer>
    );
};

export default ModalPenilaian;
