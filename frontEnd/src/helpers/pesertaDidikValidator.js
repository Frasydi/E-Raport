// helpers/pesertaDidikValidator.js

/**
 * Validasi data peserta didik
 * @param {Object} formAdd - Data peserta didik
 * @param {string} guru - Guru ID
 * @param {string} tahunAjaran - Tahun ajaran ID
 * @returns {{ valid: boolean, error: string }}
 */
export const validatePesertaDidik = (formAdd, guru, tahunAjaran) => {
    if (!formAdd.nama_lengkap) {
        return { valid: false, error: "Nama lengkap wajib diisi" };
    }
    if (!formAdd.nis) {
        return { valid: false, error: "NIS wajib diisi" };
    }
    if (!/^\d+$/.test(formAdd.nis)) {
        return { valid: false, error: "NIS hanya boleh angka" };
    }
    if (!guru || !tahunAjaran) {
        return { valid: false, error: "Guru & Tahun Ajaran wajib diisi" };
    }
    return { valid: true, error: "" };
};
