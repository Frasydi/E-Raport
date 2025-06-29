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
        // Handle both old and new Prisma error formats
        const matchFields = message.match(/Unique constraint failed on the fields: \(`([^`]+)`\)/);
        const matchConstraint = message.match(/Unique constraint failed on the constraint: `(\w+)`/);
        
        if (matchFields) {
            const field = matchFields[1];
            return `Data dengan ${field} yang sama sudah ada. Tidak boleh duplikat.`;
        } else if (matchConstraint) {
            // Extract field name from constraint name (assuming standard naming)
            const constraintName = matchConstraint[1];
            const fieldMatch = constraintName.match(/PesertaDidik_(\w+)_key/);
            const field = fieldMatch ? fieldMatch[1] : "data tertentu";
            return `Data dengan ${field} yang sama sudah ada. Tidak boleh duplikat.`;
        } else {
            return "Data yang sama sudah ada. Tidak boleh duplikat.";
        }
    }


    if (message.includes("Foreign key constraint failed")) {
        return "Data tidak dapat dihapus karena masih digunakan di tabel lain.";
    }
    return message.split("\n")[0];
}

module.exports = errorPrisma;
