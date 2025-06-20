import LayoutMenu from "../containers/layout";
import Container from "../containers/container";
import Search from "../component/input/Search";
import {
    faPlus,
    faDownload,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { AddStudentButton } from "../component/button/Button";
import Modal from "../component/Modal/ModalAdd";
import CardProfil from "../component/card/cardProfil";
import ModalInput from "../component/input/ModalInput";
//import CustomSelect from "../component/CustomSelect";
import { useState } from "react";

const PesertaDidik = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const dataOptions = [
        "2025/2026",
        "2024/2027",
        "2022/2023",
        "2123123",
        "324123",
        "2312312",
    ];
    return (
        <>
            {openModal && <Modal CloseOpenModal={setOpenModal}></Modal>}
            <LayoutMenu blur={openModal}>
                {/* Container */}
                <div className="w-5/6 mt-5">
                    {/*memilih tahun ajaran */}
                    <div className="w-72 text-sm pl-5 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5 z-10 relative">
                        <ModalInput
                            type={"select"}
                            typeOption={true}
                            value={selectedValue}
                            onChange={(val)=> setSelectedValue(val)}
                            options={dataOptions}
                            id={'tahun_ajaran'}
                            name={'tahun_ajaran'}
                            placeholder={"pilih tahun ajaran"}
                        >
                            Tahun Ajaran
                        </ModalInput>
                    </div>

                    {/* menambahkan, mendownload, dan upload */}
                    <Container>
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
                                <AddStudentButton
                                    icon={faDownload}
                                    htmlFor={"download-data"}
                                    bg={"bg-cyan-800/80 hover:bg-cyan-800"}
                                >
                                    download data
                                </AddStudentButton>
                                <AddStudentButton
                                    icon={faUpload}
                                    htmlFor={"upload-data"}
                                    bg={"bg-rose-800/80 hover:bg-rose-800"}
                                >
                                    upload data
                                </AddStudentButton>
                            </div>
                            <div className="flex text-sm items-center gap-1.5">
                                <Search
                                    htmlFor={"cari_peserta_didik"}
                                    placeholder={"cari peserta didik"}
                                ></Search>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-[61px] mt-15">
                            <CardProfil></CardProfil>
                            <CardProfil></CardProfil>
                            <CardProfil></CardProfil>
                            <CardProfil></CardProfil>
                            <CardProfil></CardProfil>
                        </div>
                    </Container>
                </div>
            </LayoutMenu>
        </>
    );
};

export default PesertaDidik;
