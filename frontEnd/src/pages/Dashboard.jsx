import { faHouse, faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import Card from "../component/Card";
import ButtonSubmit from "../component/button/Button_submit";
import TitleDashboard from "../component/dashboard/Title";
import LayoutMenu from "../containers/layout";
import InputDashboard from "../component/input/DashboardInput";
import BasicPie from "../component/cart/Pie";
import { useState, useEffect } from "react";
import { getDataProfil, updateDataProfil } from "../api/profil_sekolah";
import { getJmlPesertaDidik, getByTahunAjaran } from "../api/dashboard";
import { useSelectedTahunAjaran } from "../hooks/useSelectedTahunAjaran";
import CustomSelect from "../component/CustomSelect";
import Swal from "sweetalert2";
import PesertaLine from "../component/cart/lineChart";

const Dashboard = () => {
    const [profilSekolah, setProfilSekolah] = useState({});
    const [originalProfil, setOriginalProfil] = useState({});
    const { tahunAjaranOptions } = useSelectedTahunAjaran();
    const [selectedTahunAjaran, setSelectedTahunAjaran] = useState("");
    const [jumlahPesertaTahun, setjumlahPesertaTahun] = useState({
        laki_laki: 0,
        perempuan: 0,
    });

    const [jmlPesertaDidik, setjmlPesertaDidik] = useState({
        jumlahPria: 0,
        jumlahPerempuan: 0,
        jmlSeluruhPesertaDidik: 0,
        jmlPesertaTahunTerakhir: {
            tahun_ajaran: "",
            total: 0,
        },
        jmlPesertaLimaTerakhir: [],
    });
    const [error, setError] = useState("");

    const getByTahun = async () => {
        setError("");
        try {
            const responseJumlahPesertaTahun = await getByTahunAjaran(
                selectedTahunAjaran
            );
            setjumlahPesertaTahun({
                laki_laki: responseJumlahPesertaTahun?.totalLaki,
                perempuan: responseJumlahPesertaTahun.totalPerempuan,
            });
        } catch (error) {
            setError(error);
        }
    };


    useEffect(()=> {
        getProfil()
        fetchData()
    }, [])

    useEffect(() => {
        if (!selectedTahunAjaran) return;
        getByTahun();
    }, [selectedTahunAjaran]);

    const getProfil = async () => {
        setError("");
        try {
            const res = await getDataProfil();
            setProfilSekolah(res.data);
            setOriginalProfil(res.data);
        } catch (error) {
            setError(error.message || "data tidak ada");
        }
    };

    const fetchData = async () => {
        setError("");
        try {
            const responsejmlPesertaDidik = await getJmlPesertaDidik();
            const tahunLatest =
                responsejmlPesertaDidik?.tahunAjaranLatest || "";

            setjmlPesertaDidik({
                jumlahPria: responsejmlPesertaDidik?.jumlahPria || 0,
                jumlahPerempuan: responsejmlPesertaDidik?.jumlahPerempuan || 0,
                jmlSeluruhPesertaDidik:
                    responsejmlPesertaDidik?.jmlSeluruhPesertaDidik || 0,
                jmlPesertaTahunTerakhir: {
                    tahun_ajaran:
                        responsejmlPesertaDidik?.jmlPesertaTahunTerakhir
                            ?.tahun_ajaran || "",
                    total:
                        responsejmlPesertaDidik?.jmlPesertaTahunTerakhir
                            ?.total || 0,
                },
                jmlPesertaLimaTerakhir:
                    responsejmlPesertaDidik?.jmlPesertaLimaTahunTerakhir || [],
            });
            setSelectedTahunAjaran(tahunLatest);

            // ⬇️ Langsung panggil getByTahunAjaran supaya grafik terisi
            if (tahunLatest) {
                const responseJumlahPesertaTahun = await getByTahunAjaran(
                    tahunLatest
                );
                setjumlahPesertaTahun({
                    laki_laki: responseJumlahPesertaTahun?.totalLaki || 0,
                    perempuan: responseJumlahPesertaTahun?.totalPerempuan || 0,
                });
            }
        } catch (error) {
            setError(error);
        }
    };



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

        if (!profilSekolah || !profilSekolah.nama_sekolah) {
            return (
                <div className="text-center mt-10">Memuat data sekolah...</div>
            );
        }
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
        profilSekolah?.[field] !== originalProfil?.[field];

    return (
        <LayoutMenu>
            <div className="flex gap-0">
                <Card bg="bg-[#36AE7C]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">
                        {jmlPesertaDidik.jmlSeluruhPesertaDidik}
                    </h1>
                    <p>Total Siswa</p>
                </Card>
                <Card bg="bg-[#F9D923]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">
                        {jmlPesertaDidik.jumlahPria}
                    </h1>
                    <p>Siswa Laki Laki</p>
                </Card>
                <Card bg="bg-[#EB5353]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">
                        {jmlPesertaDidik.jumlahPerempuan}
                    </h1>
                    <p>Siswa Perempuan</p>
                </Card>
                <Card bg="bg-[#187498]" width={"w-64"}>
                    <h1 className="text-5xl font-semibold">
                        {jmlPesertaDidik.jmlPesertaTahunTerakhir.total}
                    </h1>
                    <p>
                        Siswa Baru{" "}
                        {jmlPesertaDidik.jmlPesertaTahunTerakhir.tahun_ajaran.replace(
                            "/",
                            " / "
                        )}
                    </p>
                </Card>
            </div>

            <div className="w-4/5 flex gap-10 mt-4 ">
                <div className="flex-1 flex h-full w-full drop-shadow-xl rounded-2xl flex-col bg-white">
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
                        className=" w-full px-10 text-sm self-center flex flex-col gap-4 mb-5"
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
                <div className="flex flex-col gap-2">
                    <div className="flex-1 bg-white flex drop-shadow-xl rounded-2xl flex-col pb-2 gap-2 justify-center">
                        <div className=" flex justify-center">
                            <img
                                src="/images/logoPaud.png"
                                alt=""
                                width={200}
                            />
                        </div>
                        <div className=" flex justify-center font-bold text-xl">
                            <h1>TK AL-IKHLAS BALLA</h1>
                        </div>
                    </div>
                    <div className="flex-1 bg-white flex drop-shadow-xl rounded-2xl flex-col pb-2 gap-2">
                        <TitleDashboard icon={faCalendarWeek}>
                            Statistik Siswa
                        </TitleDashboard>
                        <div className="w-96 flex gap-5 items-center justify-between text-sm pl-5">
                            <div className="flex items-center justify-between w-80 gap-1">
                                <label htmlFor="tahun_ajaran">
                                    Tahun Ajaran
                                </label>
                                <CustomSelect
                                    width={"w-52"}
                                    id={"tahun_ajaran"}
                                    name={"tahun_ajaran"}
                                    value={selectedTahunAjaran}
                                    onChange={(val) => {
                                        setSelectedTahunAjaran(val);
                                    }}
                                    options={tahunAjaranOptions}
                                    emptyMessage={
                                        "harap isi data di menu tahun ajaran"
                                    }
                                    valueKey="value"
                                />
                            </div>
                        </div>
                        <BasicPie data={jumlahPesertaTahun}></BasicPie>
                    </div>
                </div>
            </div>
            <div className="flex w-9/12 mt-10 flex-col mb-10">
                <PesertaLine
                    data={jmlPesertaDidik.jmlPesertaLimaTerakhir}
                ></PesertaLine>
            </div>
        </LayoutMenu>
    );
};

export default Dashboard;
