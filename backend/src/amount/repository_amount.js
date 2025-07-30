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

module.exports = {
    getJumlahPesertaDidik,
    getJumlahPria,
    getJumlahWanita
};
