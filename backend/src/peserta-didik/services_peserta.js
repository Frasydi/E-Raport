const {
    insertDataPesertaDidik,
    findManyDataPesertaDidik,
    findByTahunAjaran,
    updatePesertaDidik,
    deleteDataById,
} = require("./repository_peserta");
const {
    validatorField,
    validateNumbers,
    sanitizeData,
} = require("../utils/validator");
const throwWithStatus = require("../utils/throwWithStatus");

const displayDataPesertaDidik = async () => {
    try {
        const response = await findManyDataPesertaDidik();
        if (!response || response.length === 0) {
            throwWithStatus("data tidak ada, harap tambahkan data", 402);
        }
        const data = response.map((val) => {
            if (val.tanggal_lahir && val.jenis_kelamin) {
                const tanggal_lahir = val.tanggal_lahir
                    .toISOString()
                    .split("T")[0];
                const jenis_kelamin = val.jenis_kelamin.replace(
                    /([a-z])([A-Z])/g,
                    "$1-$2"
                );
                return {
                    ...val,
                    tanggal_lahir,
                    jenis_kelamin,
                };
            }
            if (val.tanggal_lahir && !val.jenis_kelamin) {
                const tanggal_lahir = val.tanggal_lahir
                    .toISOString()
                    .split("T")[0];
                return {
                    ...val,
                    tanggal_lahir,
                };
            }
            if (!val.tanggal_lahir && val.jenis_kelamin) {
                const jenis_kelamin = val.jenis_kelamin.replace(
                    /([a-z])([A-Z])/g,
                    "$1-$2"
                );
                return {
                    ...val,
                    jenis_kelamin,
                };
            }
            return {
                ...val,
            };
        });
        return data;
    } catch (error) {
        throw error;
    }
};

const addDataPesertaDidik = async (data) => {
    const { tahunAjaranId, guruId, pesertaDidik } = data;
    const dataValidator = {
        nama_lengkap: pesertaDidik.nama_lengkap,
        nis: pesertaDidik.nis,
    };
    try {
        validatorField({
            tahunAjaranId,
            guruId,
            ...dataValidator,
        });
        
        const cleaned = sanitizeData(pesertaDidik);
        if (cleaned.jenis_kelamin) {
            cleaned.jenis_kelamin = cleaned.jenis_kelamin.replace(/-/g, "");
        }
        if (pesertaDidik.nis) {
            validateNumbers({
                nis: pesertaDidik.nis,
            });
        }
        if (pesertaDidik.nisn) {
            validateNumbers({
                nisn: pesertaDidik.nisn,
            });
        }
        return await insertDataPesertaDidik({
            tahunAjaranId,
            guruId,
            pesertaDidik: cleaned,
        });
    } catch (error) {
        throw error;
    }
};

const displayByTahunAjaran = async (tahunAjaranId) => {
    try {
        const response = await findByTahunAjaran(tahunAjaranId);
        if (!response || response.length == 0) {
            throwWithStatus("data peserta didik di tahun ini belum ada", 404);
        }
        const modifiedResponse = response.map((item) => {
            // Ubah jenis_kelamin dari "LakiLaki" menjadi "Laki-Laki"
            if (
                item.pesertaDidik &&
                item.pesertaDidik.jenis_kelamin === "LakiLaki"
            ) {
                item.pesertaDidik.jenis_kelamin = "Laki-Laki";
            }

            // Ubah format tanggal_lahir
            if (item.pesertaDidik && item.pesertaDidik.tanggal_lahir) {
                const date = new Date(item.pesertaDidik.tanggal_lahir);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                item.pesertaDidik.tanggal_lahir = `${year}-${month}-${day}`;
            }

            return item;
        });

        return modifiedResponse;
    } catch (error) {
        throw error;
    }
};

const updateData = async (data, id_peserta_didik, id_tahun_ajaran) => {
    const dataValidator = {
        nama_lengkap: data.pesertaDidik.nama_lengkap,
        nis: data.pesertaDidik.nis,
    };
    validatorField(dataValidator);
    try {
        const cleaned = sanitizeData(data.pesertaDidik);
        if (cleaned.jenis_kelamin) {
            cleaned.jenis_kelamin = cleaned.jenis_kelamin.replace(/-/g, "");
        }
        if (data.pesertaDidik.nis) {
            validateNumbers({
                nis: data.pesertaDidik.nis,
            });
        }
        if (data.pesertaDidik.nisn) {
            validateNumbers({
                nisn: data.pesertaDidik.nisn,
            });
        }
        return await updatePesertaDidik({
            tahunAjaranId: data.tahunAjaranId,
            guruId: data.guruId,
            pesertaDidik: {...cleaned}
        }, id_peserta_didik, id_tahun_ajaran);
    } catch (error) {
        throw error;
    }
};

const deleteDataPeserta = async (id_peserta_didik, id_tahun_ajaran) => {
    try {
        if(!id_peserta_didik || !id_tahun_ajaran) {
            throwWithStatus('not found', 404)
        }
        return await deleteDataById(id_peserta_didik, id_tahun_ajaran);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    addDataPesertaDidik,
    displayDataPesertaDidik,
    displayByTahunAjaran,
    updateData,
    deleteDataPeserta,
};
