/*
  Warnings:

  - A unique constraint covering the columns `[indikatorId,rekapNilaiId]` on the table `Penilaian` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Penilaian_indikatorId_rekapNilaiId_key` ON `Penilaian`(`indikatorId`, `rekapNilaiId`);
