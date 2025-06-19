function errorPrisma(error) {
    if (!error || !error.message) {
        return "Terjadi kesalahan tak terduga.";
    }

    const message = error.message;

    if (message.includes("Unknown argument")) {
        const match = message.match(/Unknown argument `(\w+)`/);
        const field = match ? match[1] : "tidak dikenal";
        return `Field '${field}' tidak valid. Periksa nama field-nya.`;
    }

    if (message.includes("Argument") && message.includes("missing")) {
        return "Ada field yang wajib tapi belum diisi.";
    }

    if (message.includes("Unique constraint failed")) {
        return "Data sudah ada, tidak boleh duplikat.";
    }

    return message.split("\n")[0];
}

module.exports = errorPrisma;
