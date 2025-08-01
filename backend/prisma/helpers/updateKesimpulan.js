const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateKesimpulan(rekapNilaiId) {
  const allPenilaian = await prisma.penilaian.findMany({
    where: { rekapNilaiId },
    select: { nilai: true },
  });

  const totalIndikator = allPenilaian.length;
  let totalB = 0;
  let totalC = 0;
  let totalP = 0;

  for (const p of allPenilaian) {
    if (!p.nilai) continue; // skip null
    if (p.nilai === "B") totalB++;
    else if (p.nilai === "C") totalC++;
    else if (p.nilai === "P") totalP++;
  }

  const dataKesimpulan = {
    pencapaian_perkembangan_baik: `${totalB}/${totalIndikator}`,
    pencapaian_perkembangan_buruk: `${totalC}/${totalIndikator}`,
    pencapaian_perkembangan_perlu_dilatih: `${totalP}/${totalIndikator}`,
  };

  const existingKesimpulan = await prisma.kesimpulan.findUnique({
    where: { id_rekap_nilai: rekapNilaiId },
  });

  if (existingKesimpulan) {
    await prisma.kesimpulan.update({
      where: { id_rekap_nilai: rekapNilaiId },
      data: dataKesimpulan,
    });
  } else {
    await prisma.kesimpulan.create({
      data: {
        id_rekap_nilai: rekapNilaiId,
        ...dataKesimpulan,
        saran_dan_masukan: null,
      },
    });
  }
}

module.exports = updateKesimpulan;
