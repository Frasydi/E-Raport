const prisma = require("../../prisma/prismaClient");
const throwWithStatus = require("../utils/throwWithStatus");
const errorPrisma = require("../utils/errorPrisma");

const getJumlahPesertaDidik = async () => {
    try {
        const response = await prisma.pesertaDidik.count();
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500);
    }
};

const getJumlahPria = async () => {
    try {
        const response = await prisma.pesertaDidik.count({
            where: { jenis_kelamin: "LakiLaki" },
        });
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500);
    }
};

const getJumlahWanita = async () => {
    try {
        const response = await prisma.pesertaDidik.count({
            where: { jenis_kelamin: "Perempuan" },
        });
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500);
    }
};

const getJmlPesertatahunAjaranTerakhir = async () => {
    try {
        const latest = await prisma.tahunAjaran.findFirst({
            orderBy: {
                tahun_ajaran: "desc",
            },
        });

        const totalPesertaDidik = await prisma.rekapNilai.findMany({
            where: {
                tahunAjaranId: latest.id_tahun_ajaran,
            },
            distinct: ["pesertaDidikId"], // agar tidak duplikat
            select: {
                pesertaDidikId: true,
            },
        });
        return {
            tahun_ajaran: latest.tahun_ajaran,
            total_peserta_didik: totalPesertaDidik.length,
        };
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500);
    }
};

const getByTahunAjaran = async (id_tahun_ajaran) => {
    const rekapNilai = await prisma.rekapNilai.findMany({
        where: {
            tahunAjaranId: id_tahun_ajaran,
        },
        include: {
            pesertaDidik: {
                select: {
                    jenis_kelamin: true,
                },
            },
        },
        distinct: ["pesertaDidikId"],
    });
    return rekapNilai;
};

const findByLimaTahunterakhir = async () => {
    try {
        const data = await prisma.tahunAjaran.findMany({
            orderBy: {
                tahun_ajaran: "desc", // ambil dari yang terbaru
            },
            take: 10,
            include: {
                rekapNilai: {
                    distinct: ["pesertaDidikId"], // agar tidak double
                    select: {
                        pesertaDidikId: true,
                    },
                },
            },
        });

        // ubah urutan dari terkecil ke terbesar
        const result = data
            .map((tahun) => ({
                tahun_ajaran: tahun.tahun_ajaran,
                total_peserta_didik: tahun.rekapNilai.length,
            }))
            .sort((a, b) => (a.tahun_ajaran > b.tahun_ajaran ? 1 : -1));
        return result;
    } catch (error) {
        throwWithStatus(errorPrisma(error));
    }
};

const findLatestTahunAjaran = async () => {
    try {
        const response = await prisma.tahunAjaran.findFirst({
            orderBy: {
                tahun_ajaran: "desc",
            },
            select: {
                id_tahun_ajaran: true,
                tahun_ajaran: true,
            },
        });
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500);
    }
};

module.exports = {
    getJumlahPesertaDidik,
    getJumlahPria,
    getJumlahWanita,
    getJmlPesertatahunAjaranTerakhir,
    getByTahunAjaran,
    findByLimaTahunterakhir,
    findLatestTahunAjaran,
};
