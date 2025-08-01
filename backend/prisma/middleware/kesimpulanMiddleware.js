const updateKesimpulan = require("../helpers/updateKesimpulan");

const kesimpulanMiddleware = (prisma) => {
  prisma.$use(async (params, next) => {
    let rekapNilaiId = null;

    if (params.model === "Penilaian") {
      if (params.action === "create") {
        const result = await next(params);
        rekapNilaiId = result.rekapNilaiId;
      } else if (params.action === "update") {
        const result = await next(params);
        rekapNilaiId = result.rekapNilaiId;
      } else if (params.action === "delete") {
        const beforeDelete = await prisma.penilaian.findUnique({
          where: params.args.where,
          select: { rekapNilaiId: true },
        });
        const result = await next(params);
        rekapNilaiId = beforeDelete?.rekapNilaiId;
      }

      if (rekapNilaiId) {
        await updateKesimpulan(rekapNilaiId);
      }

      return rekapNilaiId ? true : next(params);
    }

    return next(params);
  });
};

module.exports = kesimpulanMiddleware;
