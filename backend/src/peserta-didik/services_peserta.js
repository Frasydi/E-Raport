const {
    insertDataPesertaDidik,
    findManyDataPesertaDidik,
    findByTahunAjaran,
    updatePesertaDidik,
    deleteDataById
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
        // mengubah data kosong menjadi null
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
        return response;
    } catch (error) {
        throw error;
    }
};

const updateData = async (data, id) => {
    const dataValidator = {
        nama_lengkap: data.nama_lengkap,
        nis: data.nis,
    };
    validatorField({
        ...dataValidator,
    });

    try {
        const cleaned = sanitizeData(data);
        if (cleaned.jenis_kelamin) {
            cleaned.jenis_kelamin = cleaned.jenis_kelamin.replace(/-/g, "");
        }
        if (data.nis) {
            validateNumbers({
                nis: data.nis,
            });
        }
        if (data.nisn) {
            validateNumbers({
                nisn: data.nisn,
            });
        }

        return await updatePesertaDidik(cleaned, id)
    } catch (error) {
        console.log(error)
        throw error;
    }
};

const deleteDataPeserta = async(id)=> {
    try {
        return await deleteDataById(id)        
    } catch (error) {
        throw error
    }
}
module.exports = {
    addDataPesertaDidik,
    displayDataPesertaDidik,
    displayByTahunAjaran,
    updateData,
    deleteDataPeserta
};
