const throwWithStatus = require("./throwWithStatus");
const validator = require("validator");

const validateEmail = (email) => {
    if (!email) {
        return;
    }
    if (!validator.isEmail(email)) {
        throwWithStatus(
            "Email harus menggunakan format yang benar, seperti example@mail.com",
            400
        );
    }
};

const validatorField = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "")
        ) {
            throwWithStatus(`Field '${key}' tidak boleh kosong`, 400);
        }
    }
};

const validatePhoneNumber = (phone) => {
    if (!phone) {
        return;
    }
    const cleaned = String(phone).replace(/[\s\-]/g, "");
    const regex = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;
    if (!regex.test(cleaned)) {
        throwWithStatus(`Nomor HP "${phone}" tidak valid`, 400);
    }
};

const validateNumbers = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (isNaN(Number(value))) {
            throwWithStatus(`Field ${key} harus berupa angka`, 400);
        }
    }
};

const validateUpdatePayload = (newData, existingData) => {
    // 1. Cek data kosong
    if (!newData || Object.keys(newData).length === 0) {
        throwWithStatus("Tidak ada data yang dikirim untuk diupdate", 400);
    }
    // 2. Cek data lama dari DB
    if (!existingData) {
        throwWithStatus("Data tidak ditemukan", 404);
    }

    // 3. Cek apakah ada yang berubah
    const hasChanged = Object.keys(newData).some((key) => {
        return newData[key] !== existingData[key];
    });

    if (!hasChanged) {
        throwWithStatus("Tidak ada data yang berubah", 403);
    }
};

function isValidTahunAjaran(tahun) {
    const regex = /^(\d{4})\/(\d{4})$/;
    const match = tahun.match(regex);

    if (!match) {
        throwWithStatus(
            "Format tahun_ajaran tidak valid. Gunakan format YYYY/YYYY",
            400
        );
    }

    const tahunAwal = parseInt(match[1], 10);
    const tahunAkhir = parseInt(match[2], 10);
    if (tahunAkhir !== tahunAwal + 1) {
        throwWithStatus(
            "Tahun kedua harus satu tahun setelah tahun pertama. Contoh: 2025/2026",
            400
        );
    }
}

module.exports = {
    validateEmail,
    validateNumbers,
    validatePhoneNumber,
    validatorField,
    validateUpdatePayload,
    isValidTahunAjaran
};
