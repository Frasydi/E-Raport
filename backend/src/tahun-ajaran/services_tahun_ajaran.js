const { findManyTahun, insertDataTahun, deleteDataTahun } = require("./repository_tahun_ajaran");
const throwWithStatus = require("../utils/throwWithStatus");
const { validatorField, isValidTahunAjaran } = require("../utils/validator");

const displayTahun = async () => {
    try {
        const findMany = await findManyTahun();
        if (!findMany || findMany.length === 0) {
            throwWithStatus("data tidak ada, harap tambahkan data", 402);
        }
        return findMany
    } catch (error) {
        throw error;
    }
};

const addDataTahun = async (data) => {
    const { tahun_ajaran } = data;
    if (tahun_ajaran) {
        validatorField({
            tahun_ajaran,
        });
        isValidTahunAjaran(tahun_ajaran);
        return await insertDataTahun(data);
    }
    throwWithStatus("kesalahan server", 500)
};

const removeTahun = async (id)=> {
    if(!id) throwWithStatus('id tidak ditemukan', 404)
    try {
        return await deleteDataTahun(id)
    } catch (error) {
        throw error
    }
}

module.exports = {
    displayTahun,
    addDataTahun,
    removeTahun
};
