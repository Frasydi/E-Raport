const prisma = require("../../prisma/prismaClient");
const throwWithStatus = require("../utils/throwWithStatus");

const insertData = async function (username, password) {
    return await prisma.users.create({
        data: {
            username,
            password,
        },
    });
};

const findUsername = async function (username) {
    const user = await prisma.users.findFirst({
        where: {
            username: username,
        },
    });
    if (!user) {
        throwWithStatus("username atau kata sandi salah", 400);
    }
    return user;
};

const updateToken = async function (token, idUser) {
    const update = await prisma.users.update({
        where: {
            id: idUser,
        },
        data: {
            token,
        },
    });
    return update;
};

const findToken = async function (token) {
    const find =  prisma.users.findFirst({
        where: {
            token,
        },
    });
    if(!find) {
        throwWithStatus('forbidden', 403)
    }
    return find
};

module.exports = {
    insertData,
    findUsername,
    updateToken,
    findToken,
};
