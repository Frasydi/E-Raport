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

module.exports = {
    validateEmail,
    validateNumbers,
    validatePhoneNumber,
    validatorField,
    validateUpdatePayload
};
