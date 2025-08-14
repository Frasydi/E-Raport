function errorPrisma(error) {
    if (!error || !error.message) {
        return "Terjadi kesalahan tak terduga.";
    }

    const message = error.message;

    // 1. Unknown field
    if (message.includes("Unknown argument")) {
        const match = message.match(/Unknown argument `(\w+)`/);
        const field = match ? match[1] : "tidak dikenal";
        return `Field '${field}' tidak valid. Periksa nama field-nya.`;
    }

    // 2. Missing required argument
    if (message.includes("Argument") && message.includes("missing")) {
        return "Ada field yang wajib tapi belum diisi.";
    }

    // 3. Unique constraint failed
    if (message.includes("Unique constraint failed")) {
        const matchFields = message.match(
            /Unique constraint failed on the fields: \(`([^`]+)`\)/
        );
        if (matchFields) {
            const field = matchFields[1];
            return `Data dengan ${field} yang sama sudah ada. Tidak boleh duplikat.`;
        }
        return "Data yang sama sudah ada. Tidak boleh duplikat.";
    }

    // 4. Foreign key constraint failed
    if (message.includes("Foreign key constraint violated on the fields:")) {
        const match = message.match(/fields: \(`([^`]+)`\)/);
        const field = match ? match[1] : "";

        // Mapping field ke pesan
        const fieldMap = {
            tahunAjaranId:
                "Data Tahun Ajaran tidak dapat dihapus karena masih digunakan pada data Kelas, Peserta Didik, atau Penilaian.",
            kelasId:
                "Data Kelas tidak dapat dihapus karena masih digunakan pada data Peserta Didik atau Penilaian.",
            pesertaDidikId:
                "Data Peserta Didik tidak dapat dihapus karena masih digunakan pada data Penilaian.",
        };

        return (
            fieldMap[field] ||
            "Data tidak dapat dihapus karena masih digunakan di tabel lain."
        );
    }

    // 5. Default: ambil baris pertama saja
    return message.split("\n")[0];
}

module.exports = errorPrisma;
