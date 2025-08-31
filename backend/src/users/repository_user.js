const prisma = require("../../prisma/prismaClient");
const throwWithStatus = require("../utils/throwWithStatus");
const { validateUpdatePayload } = require("../utils/validator");
const errorPrisma = require("../utils/errorPrisma");

const findMany = async function () {
    try {
        const response = await prisma.users.findMany();
        if (!response || response.length == 0)
            throwWithStatus("data user masih kosong");
        return response;
    } catch (error) {
        throwWithStatus(errorPrisma(error));
    }
};

const updateData = async function (id, username, password, role, dataDecoded) {
    try {
        const data = { username, password, role };

        // Cari user berdasarkan ID
        const user = await prisma.users.findUnique({
            where: { id },
        });
        if (dataDecoded.id == user.id && role != dataDecoded.role) {
            throwWithStatus(
                "Perubahan role ditolak: akun sedang digunakan untuk login"
            );
        }

        if (!user) {
            throwWithStatus("User tidak ditemukan", 404);
        }

        // Cek apakah username sudah dipakai user lain
        const same = await prisma.users.findFirst({
            where: { username },
        });

        if (same && same.id !== user.id) {
            throwWithStatus("Username sudah digunakan oleh user lain", 409);
        }

        // Validasi payload
        validateUpdatePayload(data, user);

        // Update data user
        const response = await prisma.users.update({
            where: { id },
            data,
        });

        return response;
    } catch (error) {
        console.error(error);
        throwWithStatus(errorPrisma(error));
    }
};

const insertData = async function (username, password, role) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                username,
            },
        });
        if (user) throwWithStatus("username sudah ada dalam tabel");
        return await prisma.users.create({
            data: { username, password, role },
        });
    } catch (error) {
        throw error;
    }
};

const deleteData = async (id) => {
    const user = await prisma.users.findUnique({
        where: { id },
    });
    if (!user) {
        throwWithStatus("id tidak ditemukan");
    }
    try {
        const hapusdata = await prisma.users.delete({
            where: {
                id,
            },
        });
        return hapusdata;
    } catch (error) {
        throwWithStatus(errorPrisma(error));
    }
};

module.exports = {
    insertData,
    updateData,
    deleteData,
    findMany,
};
