const { PrismaClient } = require("@prisma/client");
const kesimpulanMiddleware = require("./middleware/kesimpulanMiddleware")

const prisma = new PrismaClient();
kesimpulanMiddleware(prisma)

module.exports = prisma;
