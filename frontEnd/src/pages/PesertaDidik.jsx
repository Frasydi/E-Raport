import LayoutMenu from "../containers/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faPlus,
    faDownload,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import InputDashboard from "../component/input/DashboardInput";
import ButtonSubmit from "../component/button/Button_submit";
import { AddStudentButton } from "../component/button/Button";
import Modal from "../component/Modal/Modal";

import { useState } from "react";

const PesertaDidik = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            {openModal && <Modal CloseOpenModal={setOpenModal}></Modal>}
            <LayoutMenu blur={openModal}>
                {/* Container */}
                <div className="w-5/6 mt-10">
                    {/* memilih tahun ajaran */}
                    <div className="w-96 flex gap-5 items-center justify-between text-sm pl-5 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5">
                        <label htmlFor="tahun_ajaran">Tahun Ajaran</label>
                        <select
                            name="tahun_ajaran"
                            id="tahun_ajaran"
                            className=" w-2/3 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 p-1.5"
                        >
                            <option value="2024/2025">2024/2025</option>
                            <option value="2024/2025">2024/2025</option>
                            <option value="2024/2025">2024/2025</option>
                            <option value="2024/2025">2024/2025</option>
                        </select>
                    </div>

                    {/* menambahkan, mendownload, dan upload */}
                    <div className=" h-96 mt-10 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5 text-sm">
                        <div className="flex justify-between ">
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
                                <InputDashboard
                                    type={"search"}
                                    htmlFor={"cari_peserta_didik"}
                                    placeholder={"cari peserta didik"}
                                ></InputDashboard>
                                <ButtonSubmit
                                    bg={"bg-blue-600"}
                                    type={"submit"}
                                    hover={"hover:bg-blue-700"}
                                >
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlass}
                                    ></FontAwesomeIcon>
                                </ButtonSubmit>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutMenu>
        </>
    );
};

export default PesertaDidik;
