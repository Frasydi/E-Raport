import ModalContainer from "../../containers/modalContainer";
const ModalPenilaian = ({ children, size = "w-2xl h-11/12" , onClose}) => {
    return (
        <ModalContainer size={size} onClose={onClose}>
            {children}
        </ModalContainer>
    );
};

export default ModalPenilaian;
