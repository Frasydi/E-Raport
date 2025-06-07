const prisma = require('../../prisma/prismaClient')

const getUser = async() => {
    const user = await prisma.users.findMany()
    return user

}

module.exports = {
    getUser
}