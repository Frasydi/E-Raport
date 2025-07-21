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
    // Cek validitas awal
    if (!newData || (typeof newData !== "object" && !Array.isArray(newData))) {
        throwWithStatus("Format data tidak valid.", 400);
    }

    // 1. Validasi newData tidak kosong
    if (
        (Array.isArray(newData) && newData.length === 0) ||
        (!Array.isArray(newData) && Object.keys(newData).length === 0)
    ) {
        throwWithStatus("Tidak ada data yang dikirim. Mohon isi data terlebih dahulu.", 400);
    }

    // 2. Validasi existingData
    if (!existingData || Object.keys(existingData).length === 0) {
        throwWithStatus("Data yang ingin diperbarui tidak ditemukan.", 404);
    }

    // 3. Jika array, bandingkan item by id_penilaian
    if (Array.isArray(newData) && Array.isArray(existingData)) {
        const existingMap = new Map(existingData.map(item => [item.id_penilaian, item]));

        const uniqueNewData = new Map();
        newData.forEach(item => {
            if (item?.id_penilaian) uniqueNewData.set(item.id_penilaian, item);
        });

        for (const [id, newItem] of uniqueNewData.entries()) {
            const oldItem = existingMap.get(id);
            if (!oldItem) continue;

            // Bandingkan semua key yg ada di newItem
            for (const key in newItem) {
                const newVal = newItem[key];
                const oldVal = oldItem[key];

                if (
                    typeof newVal === "string" &&
                    typeof oldVal === "string" &&
                    newVal.trim() !== oldVal.trim()
                ) {
                    return; // Ada perubahan
                }

                if (
                    typeof newVal === "object" &&
                    typeof oldVal === "object" &&
                    JSON.stringify(newVal) !== JSON.stringify(oldVal)
                ) {
                    return;
                }

                if (newVal !== oldVal) {
                    return;
                }
            }
        }

        // Tidak ada perubahan
        throwWithStatus(
            "Data tidak mengalami perubahan. Silakan ubah data terlebih dahulu sebelum menyimpan.",
            403
        );
    }

    // 4. Jika object, bandingkan langsung field-fieldnya
    if (!Array.isArray(newData) && !Array.isArray(existingData)) {
        const hasChanged = Object.keys(newData).some((key) => {
            const newValue = newData[key];
            const oldValue = existingData[key];

            if (key === "tanggal_lahir") {
                const newDate = newValue ? new Date(newValue).toISOString().split("T")[0] : null;
                const oldDate = oldValue instanceof Date
                    ? oldValue.toISOString().split("T")[0]
                    : oldValue;
                return newDate !== oldDate;
            }

            if (newValue == null && oldValue == null) return false;

            if (typeof newValue === "string" && typeof oldValue === "string") {
                return newValue.trim() !== oldValue.trim();
            }

            if (typeof newValue === "object" && typeof oldValue === "object") {
                return JSON.stringify(newValue) !== JSON.stringify(oldValue);
            }

            return newValue !== oldValue;
        });

        if (!hasChanged) {
            throwWithStatus(
                "Data tidak mengalami perubahan. Silakan ubah data terlebih dahulu sebelum menyimpan.",
                403
            );
        }

        return; // Valid dan berubah
    }

    // Jika tipe tidak cocok (misal satu array dan satunya object)
    throwWithStatus("Tipe data tidak sesuai antara data baru dan data lama.", 400);
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
