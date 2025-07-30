const prisma = require("../../prisma/prismaClient");
const errorPrisma = require("../utils/errorPrisma");
const throwWithStatus = require("../utils/throwWithStatus");
const { v4: uuidv4 } = require("uuid");

const findByTahunSemester = async (tahunAjaranId, semester) => {
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
                penilaian: {
                    select: {
                        nilai: true,
                    },
                },
            },
        });

        const indikatorList = await getAllIndikator(); // ambil semua indikator
        // Pastikan setiap rekap memiliki penilaian default
        await Promise.all(
            response.map(async (rekap) => {
                if (!rekap.penilaian || rekap.penilaian.length === 0) {
                    await prisma.penilaian.createMany({
                        data: indikatorList.map((indikator) => ({
                            id_penilaian: `pnl-${uuidv4()}`,
                            indikatorId: indikator.id_indikator,
                            rekapNilaiId: rekap.id_rekap_nilai,
                            nilai: null,
                        })),
                        skipDuplicates: true,
                    });
                }
            })
        );
        // Tambahkan status, lalu hilangkan penilaian
        const withStatus = response.map(({ penilaian, ...rest }) => {
            const semuaNilaiTerisi = penilaian.every((p) => p.nilai !== null);
            return {
                ...rest,
                status: semuaNilaiTerisi ? "lengkap" : "belum lengkap",
            };
        });

        return withStatus;
    } catch (error) {
        throwWithStatus(errorPrisma(error));
    }
};

const searhPenilaian = async (id_tahun_ajaran, semester, data) => {
    try {
        const response = await prisma.rekapNilai.findMany({
            where: {
                tahunAjaranId: id_tahun_ajaran,
                semester: {
                    nama: semester,
                },
                pesertaDidik: {
                    is: {
                        OR: [
                            {
                                nama_lengkap: {
                                    contains: data,
                                },
                            },
                            {
                                nis: {
                                    contains: data,
                                },
                            },
                        ],
                    },
                },
            },
            include: {
                tahunAjaran: true,
                pesertaDidik: true,
                guru: true,
                penilaian: {
                    select: {
                        nilai: true,
                    },
                },
            },
        });

        const withStatus = response.map(({ penilaian, ...rest }) => {
            const semuaNilaiTerisi = penilaian.every((p) => p.nilai !== null);
            return {
                ...rest,
                status: semuaNilaiTerisi ? "lengkap" : "belum lengkap",
            };
        });

        return withStatus;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500);
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
        const kategoriList = await prisma.kategori.findMany({
            include: {
                subKategori: {
                    include: {
                        indikator: {
                            include: {
                                penilaian: {
                                    where: { rekapNilaiId: id_rekap_nilai },
                                },
                            },
                        },
                    },
                },
            },
        });

        // 4. Hitung status kategori dan sub-kategori
        const withStatus = kategoriList.map((kategori) => {
            const subKategoriWithStatus = (kategori.subKategori || []).map(
                (sub) => {
                    const semuaIndikatorDinilai = (sub.indikator || []).every(
                        (indikator) => {
                            const penilaian = indikator.penilaian?.[0];
                            return penilaian && penilaian.nilai !== null;
                        }
                    );

                    return {
                        id_sub_kategori: sub.id_sub_kategori,
                        nama_sub_kategori: sub.nama_sub_kategori,
                        status: semuaIndikatorDinilai
                            ? "lengkap"
                            : "belum lengkap",
                    };
                }
            );

            const kategoriLengkap = subKategoriWithStatus.every(
                (sub) => sub.status === "lengkap"
            );

            return {
                id_kategori: kategori.id_kategori,
                nama_kategori: kategori.nama_kategori,
                status: kategoriLengkap ? "lengkap" : "belum lengkap",
                subKategori: subKategoriWithStatus,
            };
        });

        return withStatus;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const getDataSubkategori = async (id_rekap_nilai, id_kategori) => {
    try {
        const subKategoriList = await prisma.subKategori.findMany({
            where: {
                kategoriId: id_kategori,
                indikator: {
                    some: {
                        penilaian: {
                            some: {
                                rekapNilaiId: id_rekap_nilai,
                            },
                        },
                    },
                },
            },
            include: {
                kategori: true,
                indikator: {
                    include: {
                        penilaian: {
                            where: {
                                rekapNilaiId: id_rekap_nilai,
                            },
                        },
                    },
                },
            },
        });

        const withStatus = subKategoriList.map((sub) => {
            const semuaNilaiTerisi = sub.indikator.every((indikator) => {
                return (
                    indikator.penilaian.length > 0 &&
                    indikator.penilaian[0].nilai !== null
                );
            });

            // Kembalikan hanya data penting + status
            return {
                id_sub_kategori: sub.id_sub_kategori,
                nama_sub_kategori: sub.nama_sub_kategori,
                kategori: {
                    id_kategori: sub.kategori.id_kategori,
                    nama_kategori: sub.kategori.nama_kategori,
                },
                status: semuaNilaiTerisi ? "lengkap" : "belum lengkap",
            };
        });

        return withStatus;
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

const getPenilaianGrouped = async (id_tahun_ajaran, semester) => {
    const findSemester = await prisma.semester.findFirst({
        where: {
            tahunAjaranId: id_tahun_ajaran,
            nama: semester,
        },
        select: { id_semester: true },
    });

    if (!findSemester) throwWithStatus("Semester tidak ditemukan", 404);

    const penilaianList = await prisma.penilaian.findMany({
        where: {
            rekapNilai: {
                tahunAjaranId: id_tahun_ajaran,
                semesterId: findSemester.id_semester,
            },
        },
        select: {
            nilai: true,
            indikator: {
                select: {
                    nama_indikator: true,
                    subKategori: {
                        select: {
                            nama_sub_kategori: true,
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
                    guru: {
                        select: {
                            nama_kelas: true,
                        },
                    },
                },
            },
        },
        orderBy: [
            {
                indikator: {
                    subKategori: {
                        kategori: {
                            id_kategori: "asc",
                        },
                    },
                },
            },
            {
                indikator: {
                    subKategori: {
                        id_sub_kategori: "asc",
                    },
                },
            },
            {
                indikator: {
                    id_indikator: "asc",
                },
            },
            {
                rekapNilai: {
                    pesertaDidik: {
                        nama_lengkap: "asc",
                    },
                },
            },
        ],
    });

    return penilaianList;
};

const searchRaport = async (id_tahun_ajaran, semester, keyword) => {
    try {
        const findSemester = await prisma.semester.findFirst({
            where: {
                tahunAjaranId: id_tahun_ajaran,
                nama: semester,
            },
            select: { id_semester: true },
        });

        if (!findSemester) throwWithStatus("Semester tidak ditemukan", 404);
        const response = await prisma.rekapNilai.findMany({
            where: {
                tahunAjaranId: id_tahun_ajaran,
                semester: {
                    nama: semester
                },
                pesertaDidik: {
                    is: {
                        OR: [
                            {
                                nama_lengkap: {
                                    contains: keyword,
                                },
                            },
                            {
                                nis: {
                                    contains: keyword,
                                },
                            },
                        ],
                    },
                },
            },
        });
        return response;
    } catch (error) {
        console.log(error)
        throwWithStatus(errorPrisma(error), 500);
    }
};

module.exports = {
    findByTahunSemester,
    getIndikator,
    createPenilaian,
    getDataKategori,
    getDataSubkategori,
    updatePenilaian,
    penilaianList,
    existing,
    getPenilaianGrouped,
    searhPenilaian,
    searchRaport,
};
