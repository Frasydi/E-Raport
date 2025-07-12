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
    // 1. Validasi newData tidak kosong
    if (!newData || Object.keys(newData).length === 0) {
        throwWithStatus("Tidak ada data yang dikirim untuk diupdate", 400);
    }

    // 2. Validasi existingData dari DB
    if (!existingData) {
        throwWithStatus("Data tidak ditemukan", 404);
    }

    // 3. Cek apakah ada data yang berubah
    const hasChanged = Object.keys(newData).some((key) => {
        const newValue = newData[key];
        const oldValue = existingData[key];

        // Khusus untuk tanggal: normalize ke YYYY-MM-DD
        if (key === "tanggal_lahir") {
            const newDate = newValue
                ? new Date(newValue).toISOString().split("T")[0]
                : null;

            const oldDate =
                oldValue instanceof Date
                    ? oldValue.toISOString().split("T")[0]
                    : oldValue;

            return newDate !== oldDate;
        }

        // Jika keduanya null/undefined, anggap sama
        if (newValue == null && oldValue == null) return false;

        // Handle string: trim dan bandingkan
        if (typeof newValue === "string" && typeof oldValue === "string") {
            return newValue.trim() !== oldValue.trim();
        }

        // Handle array/object: stringify dulu
        if (typeof newValue === "object" && typeof oldValue === "object") {
            return JSON.stringify(newValue) !== JSON.stringify(oldValue);
        }

        // Bandingkan nilai primitive (number, boolean, dll)
        return newValue !== oldValue;
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

const sanitizeData = (data) => {
    const sanitized = {};

    for (const key in data) {
        if (typeof data[key] === "string" && data[key].trim().length === 0) {
            sanitized[key] = null;
        } else {
            sanitized[key] = data[key];
        }
    }

    return sanitized;
};

module.exports = {
    validateEmail,
    validateNumbers,
    validatePhoneNumber,
    validatorField,
    validateUpdatePayload,
    isValidTahunAjaran,
    sanitizeData,
};
