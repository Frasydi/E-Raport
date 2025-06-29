const prisma = require("../../prisma/prismaClient");
const errorPrisma = require("../utils/errorPrisma");
const throwWithStatus = require("../utils/throwWithStatus");
const { v4: uuidv4 } = require("uuid");
const { validateUpdatePayload } = require("../utils/validator");

// Fungsi untuk mengambil ID semester dari Tahun Ajaran
const getSemester = async (tahunAjaranId) => {
    try {
        const result = await prisma.tahunAjaran.findUnique({
            where: {
                id_tahun_ajaran: tahunAjaranId,
            },
            include: {
                semester: {
                    select: {
                        id_semester: true,
                    },
                    orderBy: {
                        nama: "asc", // urutkan jika dibutuhkan
                    },
                },
            },
        });

        if (!result || result.semester.length !== 2) {
            throw new Error("Semester tidak ditemukan atau jumlahnya tidak 2");
        }

        return result.semester.map((s) => s.id_semester);
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500);
    }
};

// Fungsi untuk menyisipkan data peserta didik dan rekap nilai
const insertDataPesertaDidik = async (data) => {
    const { tahunAjaranId, guruId, pesertaDidik } = data;
    try {
        const semesterId = await getSemester(tahunAjaranId);
        const id = `PD-${uuidv4().split("-")[0]}`;
        if (pesertaDidik.tanggal_lahir) {
            pesertaDidik.tanggal_lahir = new Date(pesertaDidik.tanggal_lahir);
        }
        const created = await prisma.$transaction(async (tx) => {
            const peserta = await tx.pesertaDidik.create({
                data: {
                    id_peserta_didik: id,
                    ...pesertaDidik,
                },
            });

            const rekap1 = await tx.rekapNilai.create({
                data: {
                    id_rekap_nilai: `RKP-${uuidv4().split("-")[0]}`,
                    pesertaDidikId: peserta.id_peserta_didik,
                    tahunAjaranId,
                    guruId,
                    semesterId: semesterId[0],
                },
            });

            const rekap2 = await tx.rekapNilai.create({
                data: {
                    id_rekap_nilai: `RKP-${uuidv4().split("-")[0]}`,
                    pesertaDidikId: peserta.id_peserta_didik,
                    tahunAjaranId,
                    guruId,
                    semesterId: semesterId[1],
                },
            });

            return { peserta, rekap1, rekap2 };
        });
        return created;
    } catch (error) {
        throwWithStatus(errorPrisma(error));
    }
};

const findManyDataPesertaDidik = async () => {
    try {
        const response = await prisma.pesertaDidik.findMany({
            orderBy: {
                nama_lengkap: "asc",
            },
        });
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 404);
    }
};

const findByTahunAjaran = async (tahunAjaranId) => {
    try {
        const data = await prisma.rekapNilai.findMany({
            where: {
                tahunAjaranId: tahunAjaranId,
            },
            include: {
                pesertaDidik: true,
            },
            distinct: ["pesertaDidikId"], // hanya ambil satu untuk setiap pesertaDidik
        });
        return data;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const updatePesertaDidik = async (data, id_peserta_didik) => {
    const existing = await prisma.pesertaDidik.findUnique({
        where: { id_peserta_didik },
    });
    console.log(existing)
    console.log(data)
    validateUpdatePayload(data, existing);
    try {
        if (data.tanggal_lahir) {
            data.tanggal_lahir = new Date(data.tanggal_lahir);
        }
        const update = await prisma.pesertaDidik.update({
            where: { id_peserta_didik },
            data,
        });
        return update;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 400);
    }
};

const deleteDataById = async (id) => {
    try {
        const existing = await prisma.pesertaDidik.findUnique({
            where: { id_peserta_didik: id },
        });
        if(!existing) {
            throwWithStatus("data tidak ditemukan", 400)
        }
        return await prisma.pesertaDidik.delete({
            where: {
                id_peserta_didik: id,
            },
        });
    } catch (error) {
        throwWithStatus(errorPrisma(error));
    }
};

const finByTahunSemester = async(tahunAjaranId, semester)=> {
    try {
        const response = await prisma.rekapNilai.findMany({
            where:{
                tahunAjaranId: tahunAjaranId,
                semester:{
                    is:{
                        nama:semester
                    }
                }
            },
            select: {
                id_rekap_nilai:true,
                tahunAjaranId: true,
                guruId: true,
                semesterId:true,
                pesertaDidik: true
            }
        })
        return response
    } catch (error) {
        throwWithStatus(errorPrisma(error))
    }
}

module.exports = {
    insertDataPesertaDidik,
    findManyDataPesertaDidik,
    findByTahunAjaran,
    updatePesertaDidik,
    deleteDataById,
    finByTahunSemester
};
