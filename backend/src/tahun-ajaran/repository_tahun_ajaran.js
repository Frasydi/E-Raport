const prisma = require("../../prisma/prismaClient");
const throwWithStatus = require("../utils/throwWithStatus");
const errorPrisma = require("../utils/errorPrisma");
const { validateUpdatePayload } = require("../utils/validator");
const { v4: uuidv4 } = require("uuid");

const findManyTahun = async () => {
    try {
        const data = await prisma.tahunAjaran.findMany({
            orderBy: { tahun_ajaran: "asc" },
            include: {
                semester: {
                    select: {
                        id_semester: true,
                        nama: true,
                    },
                    orderBy: {
                        nama:'asc'
                    }
                },
            },
        });

        // Bersihkan hasil jika ingin pakai format custom
        const formatted = data.map((item) => ({
            id: item.id,
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
                id_tahun_ajaran: id
            }
        })
    } catch (error) {
        throwWithStatus(errorPrisma(error), 404)
    }
}

module.exports = {
    findManyTahun,
    insertDataTahun,
    deleteDataTahun,
};
