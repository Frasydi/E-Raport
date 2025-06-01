import LayoutMenu from "../containers/layout";
import ModalInput from "../component/input/ModalInput";
import Container from "../containers/container";
import Search from "../component/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
const CetakRaport = () => {
    return (
        <LayoutMenu>
            <div className="w-5/6 h-96 mt-8">
                <form
                    action="#"
                    className="w-72 flex gap-5 flex-col items-center justify-between text-sm pl-5 drop-shadow-xl rounded-2xl bg-[#ffffff] p-5"
                >
                    <ModalInput
                        type={"select"}
                        htmlFor={"tahun_ajaran"}
                        required
                        options={["2025-2024", "2023-2025"]}
                    >
                        Tahun Ajaran
                    </ModalInput>
                    <ModalInput
                        type={"select"}
                        htmlFor={"semester"}
                        options={["semester 1", "semester 2"]}
                    >
                        Semester
                    </ModalInput>
                    <ModalInput
                        type={"date"}
                        htmlFor={"tanggal_cetak"}
                        required
                    >
                        Tanggal Cetak
                    </ModalInput>
                </form>
                <Container>
                    <div className="flex text-sm items-center gap-1.5">
                        <Search
                            htmlFor={"cari peserta didik"}
                            placeholder={"cari peserta didik"}
                            label={false}
                        ></Search>
                    </div>
                    <div className="w-full mt-7 flex gap-4">
                        <p className="text-xs p-2 bg-gray-800 text-white rounded-xl w-auto">
                            cetak sampul
                        </p>
                        <p className="text-xs p-2 bg-gray-800 text-white rounded-xl w-auto">
                            cetak data diri
                        </p>
                        <p className="text-xs p-2 bg-gray-800 text-white rounded-xl w-auto">
                            cetak nilai
                        </p>
                    </div>
                    <div className="w-full mt-5 h-96 p-4 border rounded-lg shadow bg-white relative">
                        <div className="flex justify-between items-start">
                            <h2 className="text-sm font-semibold">
                                sampul raport
                            </h2>
                            <button className="text-gray-600 hover:text-gray-800">
                                <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon>
                            </button>
                        </div>

                        {/* Konten raport bisa ditambahkan di sini */}
                        <div className="mt-4 h-40"></div>
                    </div>
                </Container>
            </div>
        </LayoutMenu>
    );
};

export default CetakRaport;
