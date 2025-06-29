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
                    is: {
                        nama: semester,
                    },
                },
            },
            select: {
                id_rekap_nilai: true,
                tahunAjaranId: true,
                guruId: true,
                semesterId: true,
                pesertaDidik: true,
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
                prisma.penilaian.create({
                    data: {
                        id_penilaian: `pnl-${uuidv4()}`,
                        indikatorId: indikator.id_indikator,
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

const getDataKategori = async (id_rekap_nilai) => {
    try {
        const response = await prisma.penilaian.findMany({
            where: {
                rekapNilaiId: id_rekap_nilai, // ganti dengan ID yang kamu maksud
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
            },
        });
        return response;
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

const updatePenilaian = async (nilai, id_penilaian) => {
    try {
        const update = await prisma.penilaian.update({
            where: { id_penilaian },
            data: {
                nilai: nilai,
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
};
