const prisma = require("../../prisma/prismaClient");
const throwWithStatus = require("../utils/throwWithStatus");

const getData = async () => {
    const data = await prisma.profilSekolah.findUnique({
        where: {
            id_profil_sekolah: 1,
        },
        select: {
            nama_sekolah:true,
            NPSN:true,
            NSS:true,
            provinsi:true,
            kabupaten:true,
            kecamatan:true,
            desa:true,
            jalan:true,
            kode_pos:true,
            nomor_hp:true,
            email:true,
        },
    });
    if (!data) {
        throwWithStatus("data tidak ada", 204);
    }
    return data;
};

const updateData = async (data, id = 1) => {
    try {
        if (!data || Object.keys(data).length === 0) {
            throwWithStatus("Tidak ada data yang dikirim untuk diupdate", 400);
        }

        const existing = await prisma.profilSekolah.findUnique({
            where: { id_profil_sekolah: id },
        });

        if (!existing) {
            throwWithStatus("Data tidak ditemukan", 404);
        }

        const hasChanged = Object.keys(data).some((key) => {
            return data[key] !== existing[key];
        });

        if (!hasChanged) {
            throwWithStatus(
                "tidak ada data yang berubah",
                403
            );
        }

        const update = await prisma.profilSekolah.update({
            where: { id_profil_sekolah: id },
            data,
        });
        return update;
    } catch (error) {
        throw new Error(error.message || "Terjadi kesalahan saat update data");
    }
};

module.exports = {
    getData,
    updateData,
};
