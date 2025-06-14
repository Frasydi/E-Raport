import { faHouse, faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import Card from "../component/Card";
import ButtonSubmit from "../component/button/Button_submit";
import TitleDashboard from "../component/dashboard/Title";
import LayoutMenu from "../containers/layout";
import InputDashboard from "../component/input/DashboardInput";
import BasicPie from "../component/cart/Pie";
import { useState, useEffect } from "react";
import ErrorMessage from "../component/Error";
import { getDataProfil, updateDataProfil } from "../api/profil_sekolah";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [profilSekolah, setProfilSekolah] = useState({});
    const [originalProfil, setOriginalProfil] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataProfil();
            setProfilSekolah(res.data);
            setOriginalProfil(res.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfilSekolah((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await Swal.fire({
            title: "Simpan Data?",
            text: "Apakah Anda yakin ingin menyimpan perubahan?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, simpan",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {
            await updateDataProfil(profilSekolah);
            Swal.fire("Tersimpan!", "Data berhasil disimpan.", "success");
            setOriginalProfil(profilSekolah);
        } catch (error) {
            setProfilSekolah(originalProfil);
            Swal.fire("Gagal", `${error.msg || "Terjadi kesalahan."}`, "error");
        }
    };

    const isDataChanged = () =>
        JSON.stringify(profilSekolah) !== JSON.stringify(originalProfil);

    const isFieldChanged = (field) =>
        profilSekolah[field] !== originalProfil[field];

    return (
        <LayoutMenu>
            <div className="flex gap-0">
                <Card bg="bg-[#36AE7C]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">80</h1>
                    <p>Total Siswa</p>
                </Card>
                <Card bg="bg-[#F9D923]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">80</h1>
                    <p>Siswa Laki Laki</p>
                </Card>
                <Card bg="bg-[#EB5353]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">80</h1>
                    <p>Siswa Perempuan</p>
                </Card>
                <Card bg="bg-[#187498]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">80</h1>
                    <p>Siswa Baru 2024/2025</p>
                </Card>
            </div>

            {error && <ErrorMessage error={error}></ErrorMessage>}

            <div className="w-4/5 flex gap-10 mt-4">
                <div className="flex-1 flex h-full bg-white drop-shadow-xl rounded-2xl flex-col">
                    <TitleDashboard icon={faHouse}>
                        Profil Sekolah
                    </TitleDashboard>

                    {isDataChanged() && (
                        <div className="text-yellow-600 text-sm text-center mt-2 font-medium mb-2">
                            ⚠️ Data telah diubah. Jangan lupa klik "Simpan".
                        </div>
                    )}

                    {isDataChanged() && (
                        <div className="text-center">
                            <button
                                onClick={() => setProfilSekolah(originalProfil)}
                                className="text-red-600 text-xs underline hover:text-red-800  mb-3"
                            >
                                Batalkan Perubahan
                            </button>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="px-10 text-sm self-center flex flex-col gap-4 mb-5"
                    >
                        <InputDashboard
                            id="nama_sekolah"
                            type="text"
                            name="nama_sekolah"
                            children="Nama Sekolah"
                            placeholder="masukkan nama sekolah"
                            value={profilSekolah?.nama_sekolah ?? ""}
                            onChange={handleInputChange}
                            className={
                                isFieldChanged("nama_sekolah")
                                    ? "bg-yellow-50 border-yellow-400"
                                    : ""
                            }
                        />

                        <InputDashboard
                            id="NPSN"
                            name="NPSN"
                            type="text"
                            children="NPSN"
                            placeholder="contoh: 198502152020011001"
                            value={profilSekolah?.NPSN ?? ""}
                            onChange={handleInputChange}
                            className={
                                isFieldChanged("NPSN")
                                    ? "bg-yellow-50 border-yellow-400 ring-1 ring-yellow-500"
                                    : ""
                            }
                        />

                        <InputDashboard
                            id="NSS"
                            name="NSS"
                            type="text"
                            children="NSS"
                            placeholder="contoh: 198502152020011001"
                            value={profilSekolah?.NSS ?? ""}
                            onChange={handleInputChange}
                            className={
                                isFieldChanged("NSS")
                                    ? "bg-yellow-50 border-yellow-400"
                                    : ""
                            }
                        />

                        <label htmlFor="">Alamat :</label>
                        <div className="ml-8 flex flex-col gap-3">
                            {[
                                "provinsi",
                                "kabupaten",
                                "kecamatan",
                                "desa",
                                "jalan",
                            ].map((field) => (
                                <InputDashboard
                                    key={field}
                                    id={field}
                                    type="text"
                                    name={field}
                                    children={field}
                                    placeholder={`Masukkan nama ${field}`}
                                    value={profilSekolah?.[field] ?? ""}
                                    onChange={handleInputChange}
                                    className={
                                        isFieldChanged(field)
                                            ? "bg-yellow-50 border-yellow-400"
                                            : ""
                                    }
                                />
                            ))}
                        </div>

                        <InputDashboard
                            id="kode_pos"
                            type="number"
                            name="kode_pos"
                            children="Kode pos"
                            placeholder="Masukkan kode pos"
                            value={profilSekolah?.kode_pos ?? ""}
                            onChange={handleInputChange}
                            className={
                                isFieldChanged("kode_pos")
                                    ? "bg-yellow-50 border-yellow-400"
                                    : ""
                            }
                        />

                        <InputDashboard
                            id="nomor_hp"
                            type="tel"
                            name="nomor_hp"
                            children="Nomor Hp"
                            placeholder="08xxxxxxxxxx"
                            value={profilSekolah?.nomor_hp ?? ""}
                            onChange={handleInputChange}
                            className={
                                isFieldChanged("nomor_hp")
                                    ? "bg-yellow-50 border-yellow-400"
                                    : ""
                            }
                        />

                        <InputDashboard
                            id="Email"
                            type="text"
                            name="email"
                            children="Email"
                            placeholder="Contoh: TKalikhlas@gmail.com"
                            value={profilSekolah?.email ?? ""}
                            onChange={handleInputChange}
                            className={
                                isFieldChanged("email")
                                    ? "bg-yellow-50 border-yellow-400"
                                    : ""
                            }
                        />

                        <div className="flex gap-2 justify-center mt-2">
                            <ButtonSubmit
                                type="submit"
                                bg="bg-teal-600 w-full"
                                hover="hover:bg-teal-700"
                            >
                                Simpan
                            </ButtonSubmit>
                        </div>
                    </form>
                </div>

                <div className="flex-1 flex h-full bg-white drop-shadow-xl rounded-2xl flex-col pb-11">
                    <TitleDashboard icon={faCalendarWeek}>
                        Statistik Siswa
                    </TitleDashboard>
                    <div className="w-96 flex gap-5 items-center justify-between text-sm pl-5">
                        <label htmlFor="tahun_ajaran">Tahun Ajaran</label>
                        <select
                            name="tahun_ajaran"
                            id="tahun_ajaran"
                            className="w-2/3 outline-1 rounded-md outline-gray-300 focus:outline-2 focus:outline-blue-300 p-1.5"
                        >
                            <option value="2024/2025">2024/2025</option>
                            <option value="2023/2024">2023/2024</option>
                            <option value="2022/2023">2022/2023</option>
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
