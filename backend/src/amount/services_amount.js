const throwWithStatus = require("../utils/throwWithStatus");
const {
    getJumlahPesertaDidik,
    getJumlahWanita,
    getJumlahPria,
    getJmlPesertatahunAjaranTerakhir,
    getByTahunAjaran,
    findByLimaTahunterakhir,
    findLatestTahunAjaran
} = require("./repository_amount");

const headerProfilSekolah = async () => {
    try {
        const jmlPria = await getJumlahPria();
        const jmlPerempuan = await getJumlahWanita();
        const jmlSeluruhPesertaDidik = await getJumlahPesertaDidik();
        const jmlPesertaTahunTerakhir = await getJmlPesertatahunAjaranTerakhir();
        const findLimaTerakhir = await findByLimaTahunterakhir()
        const getLatestTahun = await findLatestTahunAjaran()

        return {
            jumlahPria: jmlPria,
            jumlahPerempuan: jmlPerempuan,
            jmlSeluruhPesertaDidik: jmlSeluruhPesertaDidik,
            jmlPesertaTahunTerakhir: {
                tahun_ajaran: jmlPesertaTahunTerakhir.tahun_ajaran,
                total: jmlPesertaTahunTerakhir.total_peserta_didik,
            },
            jmlPesertaLimaTahunTerakhir: findLimaTerakhir,
            tahunAjaranLatest: getLatestTahun.id_tahun_ajaran
        };
    } catch (error) {
        throw error;
    }
};

const displayByTahunAjaran = async (id_tahun_ajaran) => {
    try {
        if (!id_tahun_ajaran) throwWithStatus("invalid id");
        const response = await getByTahunAjaran(id_tahun_ajaran);

        let laki = 0;
        let perempuan = 0;

        response.forEach((r)=> {
            if(r.pesertaDidik.jenis_kelamin === "LakiLaki") laki++;
            else if(r.pesertaDidik.jenis_kelamin === "Perempuan") perempuan++;
        })

        return  {
            totalLaki: laki,
            totalPerempuan: perempuan
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    headerProfilSekolah,
    displayByTahunAjaran
};
