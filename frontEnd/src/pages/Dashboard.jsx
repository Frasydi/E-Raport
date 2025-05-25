import { faHouse, faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import Card from "../component/Card";
import ButtonSubmit from "../component/button/Button_submit";
import TitleDashboard from "../component/dashboard/Title";
import LayoutMenu from "../containers/layout";
import InputDashboard from "../component/input/DashboardInput";
import BasicPie from "../component/cart/Pie";
const Dashboard = () => {
    return (
        <LayoutMenu>
            {/* Card untuk menampilkan jumlah siswa */}
            <div className="flex gap-0">
                <Card bg="bg-[#36AE7C]" width={'w-64'}>
                    <h1 className="text-5xl font-semibold">80</h1>
                    <p>Total Siswa</p>
                </Card>
                <Card bg="bg-[#F9D923]" width={'w-64'}>
                    <h1 className="text-5xl font-semibold">80</h1>
                    <p>Siswa Laki Laki</p>
                </Card>
                <Card bg="bg-[#EB5353]" width={'w-64'}>
                    <h1 className="text-5xl font-semibold">80</h1>
                    <p>Siswa Perempuan</p>
                </Card>
                <Card bg="bg-[#187498]" width={'w-64'}>
                    <h1 className="text-5xl font-semibold" >80</h1>
                    <p>Siswa Baru 2024/2025</p>
                </Card>
            </div>

            <div className="w-4/5  flex gap-10 mt-4">
                <div className="flex-1 flex h-full bg-[#ffffff] drop-shadow-xl rounded-2xl flex-col">
                    <TitleDashboard icon={faHouse}>
                        Profil Sekolah
                    </TitleDashboard>
                    <form
                        action=""
                        className="px-10 text-sm self-center flex flex-col gap-4 mb-5"
                    >
                        <InputDashboard
                            htmlFor={"nama_sekolah"}
                            type={"text"}
                            children={"Nama Sekolah"}
                            placeholder={"masukkan nama sekolah"}
                        ></InputDashboard>

                        <InputDashboard
                            htmlFor={"nsip"}
                            type={"text"}
                            children={"NSIP"}
                            placeholder={"contoh: 198502152020011001"}
                        ></InputDashboard>

                        <label htmlFor="">Alamat :</label>
                        <div className="ml-8 flex flex-col gap-3">
                            <InputDashboard
                                htmlFor={"provinsi"}
                                type={"text"}
                                children={"provinsi"}
                                placeholder={"Masukkan nama provinsi"}
                            ></InputDashboard>
                            <InputDashboard
                                htmlFor={"kabupaten"}
                                type={"text"}
                                children={"kabupaten"}
                                placeholder={"Masukkan nama kabupaten"}
                            ></InputDashboard>
                            <InputDashboard
                                htmlFor={"kecamatan"}
                                type={"text"}
                                children={"kecamatan"}
                                placeholder={"Masukkan nama kecamatan"}
                            ></InputDashboard>
                            <InputDashboard
                                htmlFor={"nama_desa"}
                                type={"text"}
                                children={"Desa"}
                                placeholder={"Masukkan nama desa"}
                            ></InputDashboard>
                            <InputDashboard
                                htmlFor={"jalan"}
                                type={"text"}
                                children={"jalan"}
                                placeholder={"Masukkan nama jalan"}
                            ></InputDashboard>
                        </div>
                        <InputDashboard
                            htmlFor={"kode_pos"}
                            type={"number"}
                            children={"Kode pos"}
                            placeholder={"Masukkan kode pos"}
                        ></InputDashboard>

                        <InputDashboard
                            htmlFor={"nomor_hp"}
                            type={"tel"}
                            children={"Nomor Hp"}
                            placeholder={"08xxxxxxxxxx"}
                        ></InputDashboard>

                        <InputDashboard
                            htmlFor={"Email"}
                            type={"text"}
                            children={"Email"}
                            placeholder={"Contoh: TKalikhlas@gmail.com"}
                        ></InputDashboard>

                        <div className="flex gap-2 justify-end">
                            <ButtonSubmit
                                type={"submit"}
                                bg={"bg-teal-600"}
                                hover={"hover:bg-teal-700"}
                            >
                                Simpan
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
                </div>
                <div className="flex-1 flex h-full bg-[#ffffff] drop-shadow-xl rounded-2xl flex-col pb-11">
                    <TitleDashboard icon={faCalendarWeek}>
                        Statistik Siswa
                    </TitleDashboard>

                    <div className="w-96 flex gap-5 items-center justify-between text-sm pl-5">
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
                    <BasicPie />
                </div>
            </div>
            <div className="w-full h-96 bg-red-500 mt-10 rounded-2xl"></div>
        </LayoutMenu>
    );
};

export default Dashboard;
