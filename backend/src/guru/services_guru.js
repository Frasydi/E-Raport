const { getDataGuru, insertDataGuru, updateDataGuru, deleteDataById } = require("./repository_guru");
const throwWithStatus = require("../utils/throwWithStatus");
const { validateNumbers, validatorField } = require("../utils/validator");

const displayDataGuru = async () => {
    try {
        const profilSchool = await getDataGuru();
        if (!profilSchool || profilSchool.length === 0) {
            throwWithStatus("data tidak ada, harap tambahkan data", 402);
        }
        return profilSchool.map((guru) => ({
            ...guru,
            nama_kelas: guru.nama_kelas.replace(/([a-z])([A-Z])/g, "$1 $2"),
        }));
    } catch (error) {
        throw error;
    }
};

const AddDataGuru = async (data) => {
    const { nama_guru, NUPTK, nama_kelas } = data;
    const result = {
        ...data,
        nama_kelas: nama_kelas.replace(/\s+(\w)/g, (_, char) =>
            char.toUpperCase()
        ),
    };
    validatorField({
        nama_guru,
        NUPTK,
        nama_kelas,
    });
    if (NUPTK) {
        validateNumbers({
            NUPTK: NUPTK,
        });
    }
    if (nama_kelas == "kelompok A" || nama_kelas == "kelompok B") {
        return await insertDataGuru(result);
    }
    throwWithStatus("kesalahan server", 500);
};

const updateData = async (data, id) => {
    const { nama_guru, NUPTK, nama_kelas } = data;
    const result = {
        ...data,
        nama_kelas: nama_kelas.replace(/\s+(\w)/g, (_, char) =>
            char.toUpperCase()
        ),
    };
    validatorField({
        nama_guru,
        NUPTK,
        nama_kelas,
    });

    if (data.NUPTK) {
        validateNumbers({
            NPSN: data.NUPTK,
        });
    }

    if (nama_kelas == "kelompok A" || nama_kelas == "kelompok B") {
        return await updateDataGuru(result, id);
    }
    throwWithStatus("kesalahan server", 500);
};

const deleteDataGuru = async(id)=> {
    try {
        return await deleteDataById(id)        
    } catch (error) {
        throw error
    }
}

module.exports = {
    displayDataGuru,
    AddDataGuru,
    updateData,
    deleteDataGuru
};
