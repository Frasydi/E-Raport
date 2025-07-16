const prisma = require("../../prisma/prismaClient");
const throwWithStatus = require("../utils/throwWithStatus");
const errorPrisma = require("../utils/errorPrisma");
const { validateUpdatePayload } = require("../utils/validator");
const { v4: uuidv4 } = require("uuid");

const findManyTahun = async () => {
    try {
        const data = await prisma.tahunAjaran.findMany({
            orderBy: { tahun_ajaran: "desc" },
            include: {
                semester: {
                    select: {
                        id_semester: true,
                        nama: true,
                    },
                    orderBy: {
                        nama: "asc",
                    },
                },
            },
        });

        // Bersihkan hasil jika ingin pakai format custom
        const formatted = data.map((item) => ({
            id_tahun_ajaran: item.id_tahun_ajaran,
            tahun_ajaran: item.tahun_ajaran,
            semester: item.semester.map((s) => s.nama), // hanya ambil nama semester
        }));
        return formatted;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 404);
    }
};

const findTahun = async (tahun_ajaran) => {
    return await prisma.tahunAjaran.findFirst({
        where: {
            tahun_ajaran: tahun_ajaran,
        },
    });
};

const insertDataTahun = async (data) => {
    try {
        if (await findTahun(data.tahun_ajaran)) {
            throwWithStatus(
                "Tahun ajaran ini sudah ada. Silakan masukkan tahun ajaran yang berbeda",
                400
            );
        }
        const uuid = uuidv4().split("-")[0];
        const id_tahun_ajaran = `${"thn"}-${uuid}`;

        const result = await prisma.$transaction([
            prisma.tahunAjaran.create({
                data: {
                    id_tahun_ajaran,
                    tahun_ajaran: data.tahun_ajaran,
                },
            }),
            prisma.semester.createMany({
                data: [
                    {
                        nama: "semester 1",
                        tahunAjaranId: id_tahun_ajaran,
                    },
                    {
                        nama: "semester 2",
                        tahunAjaranId: id_tahun_ajaran,
                    },
                ],
            }),
        ]);
        return result;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 404);
    }
};

const deleteDataTahun = async (id) => {
    try {
        return await prisma.tahunAjaran.delete({
            where: {
                id_tahun_ajaran: id,
            },
        });
    } catch (error) {
        throwWithStatus(errorPrisma(error), 404);
    }
};

const updateDataTahun = async (data, id) => {
    const existing = await prisma.tahunAjaran.findUnique({
        where: { id_tahun_ajaran: id },
    });
    const same = await prisma.tahunAjaran.findFirst({
        where: {
            tahun_ajaran: data.tahun_ajaran,
        },
    });
    validateUpdatePayload(data, existing);
    if (same) {
        throwWithStatus("data ini sudah ada di tabel", 409);
    }
    try {
        const response = await prisma.tahunAjaran.update({
            where: { id_tahun_ajaran: id },
            data,
        });
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error), 404);
    }
};

const searchDataTahun = async (data) => {
    if (!data || typeof data !== "string" || data.trim() === "") {
        throwWithStatus("Query pencarian tidak valid", 400);
    }
    try {
        const response = await prisma.tahunAjaran.findMany({
            where: {
                tahun_ajaran: {
                    contains: data,
                },
            },
        });
        if(!response || response.length == 0) {
            throwWithStatus("data tidak ditemukan", 403)
        }
        return response
    } catch (error) {
        throwWithStatus(errorPrisma(error), 500)
    }
};

module.exports = {
    findManyTahun,
    insertDataTahun,
    deleteDataTahun,
    updateDataTahun,
    searchDataTahun
};
