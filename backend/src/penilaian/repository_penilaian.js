const prisma = require("../../prisma/prismaClient");
const errorPrisma = require("../utils/errorPrisma");
const throwWithStatus = require("../utils/throwWithStatus");
const { v4: uuidv4 } = require("uuid");

const finByTahunSemester = async (tahunAjaranId, semester) => {
    try {
        const response = await prisma.rekapNilai.findMany({
            where: {
                tahunAjaranId: tahunAjaranId,
                semester: {
                    nama: semester,
                },
            },
            include: {
                tahunAjaran: true,
                pesertaDidik: true,
                guru: true,
            },
        });
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error));
    }
};

const createPenilaian = async (id_rekap_nilai) => {
    try {
        const indikatorList = await getIndikator();
        const results = await Promise.all(
            indikatorList.map((indikator) =>
                prisma.penilaian.createMany({
                    data: {
                        id_penilaian: `pnl-${uuidv4()}`,
                        indikatorId: indikator.indikator.id_indikator,
                        rekapNilaiId: id_rekap_nilai,
                        nilai: null,
                    },
                })
            )
        );
        return results;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const getAllIndikator = async () => {
    return await prisma.indikator.findMany({
        select: {
            id_indikator: true,
            nama_indikator: true,
        },
    });
};

const getDataKategori = async (id_rekap_nilai) => {
    try {
        const jumlahPenilaian = await prisma.penilaian.count({
            where: { rekapNilaiId: id_rekap_nilai },
        });
        if (jumlahPenilaian === 0) {
            const indikatorList = await getAllIndikator();
            await prisma.penilaian.createMany({
                data: indikatorList.map((indikator) => ({
                    id_penilaian: `pnl-${uuidv4()}`,
                    indikatorId: indikator.id_indikator,
                    rekapNilaiId: id_rekap_nilai,
                    nilai: null,
                })),
                skipDuplicates: true,
            });
        }

        const response = await prisma.penilaian.findMany({
            where: {
                rekapNilaiId: id_rekap_nilai,
            },
            select: {
                indikator: {
                    select: {
                        subKategori: {
                            select: {
                                kategori: {
                                    select: {
                                        id_kategori: true,
                                        nama_kategori: true,
                                    },
                                },
                            },
                        },
                    },
                },
                rekapNilai: {
                    select: {
                        pesertaDidik: true,
                        tahunAjaran: true,
                        semester: true,
                    },
                },
            },
        });
        const sorted = response.sort((a, b) => {
            const idA = a.indikator.subKategori.kategori.id_kategori;
            const idB = b.indikator.subKategori.kategori.id_kategori;
            return idA - idB;
        });
        return sorted;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const getDataSubkategori = async (id_rekap_niai, id_kategori) => {
    try {
        const subKategoriList = await prisma.subKategori.findMany({
            where: {
                kategoriId: id_kategori, // ← parameter dari luar
                indikator: {
                    some: {
                        penilaian: {
                            some: {
                                rekapNilaiId: id_rekap_niai, // ← parameter dari luar
                            },
                        },
                    },
                },
            },
            include: {
                kategori: true,
            },
        });
        return subKategoriList;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const getIndikator = async (id_rekap_nilai, id_kategori, id_sub_kategori) => {
    try {
        const data = await prisma.penilaian.findMany({
            where: {
                rekapNilaiId: id_rekap_nilai, // ← dari parameter
                indikator: {
                    subKategori: {
                        id_sub_kategori: id_sub_kategori, // ← dari parameter
                        kategoriId: id_kategori, // ← dari parameter
                    },
                },
            },
            select: {
                nilai: true,
                indikator: {
                    select: {
                        id_indikator: true,
                        nama_indikator: true,
                        subKategori: {
                            include: {
                                kategori: {
                                    select: {
                                        id_kategori: false,
                                        nama_kategori: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return data;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const penilaianList = async (id_rekap_nilai, id_sub_kategori) => {
    return await prisma.penilaian.findMany({
        where: {
            rekapNilaiId: id_rekap_nilai,
            indikator: {
                subKategoriId: Number(id_sub_kategori),
            },
        },
        select: {
            id_penilaian: true,
            indikatorId: true,
        },
    });
};

const existing = async (id_penilaian) => {
    try {
        const existing = await prisma.penilaian.findUnique({
            where: { id_penilaian: id_penilaian },
        });
        return existing;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const updatePenilaian = async (nilai, id_penilaian) => {
    try {
        const update = await prisma.penilaian.update({
            where: { id_penilaian },
            data: {
                nilai,
            },
        });

        return update;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};


module.exports = {
    finByTahunSemester,
    getIndikator,
    createPenilaian,
    getDataKategori,
    getDataSubkategori,
    updatePenilaian,
    penilaianList,
    existing
};
