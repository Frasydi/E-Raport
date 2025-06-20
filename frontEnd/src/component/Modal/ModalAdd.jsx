import ModalInput from "../input/ModalInput";
import ButtonSubmit from "../button/Button_submit";
import ModalContainer from "../../containers/modalContainer";

const Modal = ({ CloseOpenModal }) => {
    return (
        <ModalContainer CloseOpenModal={CloseOpenModal}>
            <h2 className="flex font-semibold text-lg text-gray-800 mb-4 mt-8 ">
                Tambah Peserta Didik
            </h2>
            <form action="#" className="w-2/3 text-sm">
                <div className="w-full h-15 flex gap-5 mb-7">
                    <ModalInput
                        type={"select"}
                        options={["suhari", "aseprocky", "cihuyy"]}
                        id={'kelas'}
                        //placeholder={'asdasd'}
                        name={'kelas'}
                        required
                    >
                        Kelas <span className="text-red-500">*</span>
                    </ModalInput>
                    <ModalInput
                        type={"select"}
                        options={["suhari", "aseprocky", "cihuyy"]}
                        id={'tahun_ajaran'}
                        initialName={"pilih nama guru"}
                        required
                    >
                        Tahun Ajaran <span className="text-red-500">*</span>
                    </ModalInput>
                </div>
                <div className="flex mt-1 flex-col w-full">
                    <p className="text-sm text-gray-900/80 font-semibold border-t-2 pt-1 border-t-gray-900/80">
                        Informasi peserta didik
                    </p>
                    <div className="flex gap-5 mt-3 w-full">
                        <ModalInput
                            type={"text"}
                            placeholder={"nama lengkap"}
                            htmlFor={"nama_lengkap"}
                            required
                        >
                            nama lengkap <span className="text-red-500">*</span>
                        </ModalInput>
                        <ModalInput
                            type={"text"}
                            placeholder={"nama panggilan"}
                            htmlFor={"nama_panggilan"}
                        >
                            nama panggilan
                        </ModalInput>
                    </div>
                </div>
                <div className="flex gap-5 mt-5">
                    <ModalInput
                        type={"number"}
                        placeholder={"NIS"}
                        htmlFor={"NIS"}
                    >
                        NIS
                    </ModalInput>
                    <ModalInput
                        type={"number"}
                        placeholder={"NISN"}
                        htmlFor={"NISN"}
                    >
                        NISN
                    </ModalInput>
                </div>
                <div className="flex gap-5 mt-5">
                    <ModalInput
                        type={"text"}
                        placeholder={"tempat lahir"}
                        htmlFor={"tempat_lahir"}
                        required
                    >
                        tempat lahir <span className="text-red-500">*</span>
                    </ModalInput>
                    <ModalInput
                        type={"date"}
                        placeholder={"tanggal lahir"}
                        htmlFor={"tanggal_lahir"}
                        required
                    >
                        Tanggal Lahir <span className="text-red-500">*</span>
                    </ModalInput>
                </div>
                <div className="flex gap-5 mt-5 w-full">
                    <ModalInput
                        type={"select"}
                        typeOption={true}
                        options={["Laki-Laki", "Perempuan"]}
                        htmlFor={"jenis-kelamin"}
                        required
                    >
                        Jenis Kelamin <span className="text-red-500">*</span>
                    </ModalInput>
                    <ModalInput
                        type={"select"}
                        typeOption={true}
                        options={[
                            "Islam",
                            "Kristen",
                            "Katolik",
                            "Hindu",
                            "Buddha, Konghucu",
                        ]}
                        placeholder={"agama"}
                        htmlFor={"agama"}
                        required
                    >
                        Agama <span className="text-red-500">*</span>
                    </ModalInput>
                </div>
                <div className="flex gap-5 mt-5 w-full ">
                    <ModalInput
                        type={"number"}
                        placeholder={"anak ke-"}
                        htmlFor={"anak_ke"}
                    >
                        anak ke- <span className="text-red-500">*</span>
                    </ModalInput>
                </div>
                <div className="flex mt-7 flex-col w-full">
                    <p className="text-sm text-gray-900/80 font-semibold border-t-2 pt-1 border-t-gray-900/80">
                        Informasi orang tua :
                    </p>
                    <div className="flex gap-5 mt-3 w-full ">
                        <ModalInput
                            type={"text"}
                            placeholder={"nama ayah"}
                            htmlFor={"nama_ayah"}
                        >
                            Nama Ayah <span className="text-red-500">*</span>
                        </ModalInput>
                        <ModalInput
                            type={"text"}
                            placeholder={"pekerjaan ayah"}
                            htmlFor={"pekerjaan_ayah"}
                        >
                            pekerjaan ayah{" "}
                            <span className="text-red-500">*</span>
                        </ModalInput>
                    </div>
                </div>
                <div className="flex gap-5 mt-5 w-full ">
                    <ModalInput
                        type={"text"}
                        placeholder={"nama ibu"}
                        htmlFor={"nama_ayah"}
                    >
                        Nama ibu <span className="text-red-500">*</span>
                    </ModalInput>
                    <ModalInput
                        type={"text"}
                        placeholder={"pekerjaan ibu"}
                        htmlFor={"pekerjaan_ibu"}
                    >
                        pekerjaan ibu <span className="text-red-500">*</span>
                    </ModalInput>
                </div>
                <div className="flex gap-5 mt-5 w-full ">
                    <ModalInput
                        type={"text"}
                        placeholder={"provinsi"}
                        htmlFor={"provinsi"}
                    >
                        Provinsi <span className="text-red-500">*</span>
                    </ModalInput>
                    <ModalInput
                        type={"text"}
                        placeholder={"kabupaten"}
                        htmlFor={"kabupaten"}
                    >
                        Kabupaten <span className="text-red-500">*</span>
                    </ModalInput>
                </div>
                <div className="flex gap-5 mt-5 w-full ">
                    <ModalInput
                        type={"text"}
                        placeholder={"kecamatan"}
                        htmlFor={"kecamatan"}
                    >
                        Kecamatan<span className="text-red-500">*</span>
                    </ModalInput>
                    <ModalInput
                        type={"text"}
                        placeholder={"desa/kelurahan"}
                        htmlFor={"desa/kelurahan"}
                    >
                        Desa / Kelurahan <span className="text-red-500">*</span>
                    </ModalInput>
                </div>
                <div className="flex gap-5 mt-5 w-full ">
                    <ModalInput
                        type={"text"}
                        placeholder={"Jalan"}
                        htmlFor={"jalan"}
                    >
                        Jalan
                    </ModalInput>
                </div>

                {/* Button Submit */}
                <div className="flex gap-2 mt-5 w-full justify-start pt-5">
                    <ButtonSubmit
                        bg={"bg-teal-600"}
                        type={"submit"}
                        hover={"hover:bg-teal-700"}
                    >
                        Submit
                    </ButtonSubmit>
                    <ButtonSubmit
                        type={"reset"}
                        bg={"bg-gray-600"}
                        hover={"hover:bg-gray-700"}
                    >
                        Reset
                    </ButtonSubmit>
                </div>
            </form>
        </ModalContainer>
    );
};

export default Modal;
