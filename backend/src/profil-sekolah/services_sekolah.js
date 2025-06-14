const { getData, updateData } = require("./repository_sekolah");
const {
    validatePhoneNumber,
    validateNumbers,
    validateEmail,
} = require("../utils/validator");

const displayDataSchool = async () => {
    try {
        const profilSchool = await getData();
        return profilSchool;
    } catch (error) {
        throw error;
    }
};

const updateDataSchool = async (data) => {
    if (data.NPSN && data.NSS && data.kode_pos) {
        validateNumbers({
            NPSN: data.NPSN,
            NSS: data.NSS,
            kode_pos: data.kode_pos,
        });
    }
    validateEmail(data.email);
    validatePhoneNumber(data.nomor_hp);
    await updateData(data);
    return {
        succes: true,
        msg: "update data berhasil",
    };
};
module.exports = {
    displayDataSchool,
    updateDataSchool,
};
