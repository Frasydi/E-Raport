const { updateKesimpulan, getKesimpulan } = require("./repository_kesimpulan");
const throwWithStatus = require("../utils/throwWithStatus");
const { validateUpdatePayload } = require("../utils/validator");

const updateData = async (id_rekap_nilai, data) => {
    if (!id_rekap_nilai || !data) throwWithStatus("invalid payload");
    try {
        const dataKesimpulan = await getKesimpulan(id_rekap_nilai);
        const existing = {
            saran_dan_masukan: dataKesimpulan.saran_dan_masukan,
        };
        validateUpdatePayload(data, existing);
        
        const updateData = await updateKesimpulan(id_rekap_nilai, data)
        return updateData
    } catch (error) {
        throw error
    }
};

const getData = async (id_rekap_nilai) => {
    if (!id_rekap_nilai) throwWithStatus("invalid id");
    try {
        const response = await getKesimpulan(id_rekap_nilai);
        if (!response || response.length == 0)
            throwWithStatus("data tidak ditemukan");
        return response;
    } catch (error) {
        throw error;
    }
};

module.exports = { getData, updateData };
