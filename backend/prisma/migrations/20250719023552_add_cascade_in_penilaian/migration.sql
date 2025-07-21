-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `Penilaian_rekapNilaiId_fkey`;

-- DropIndex
DROP INDEX `Penilaian_rekapNilaiId_fkey` ON `penilaian`;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_rekapNilaiId_fkey` FOREIGN KEY (`rekapNilaiId`) REFERENCES `RekapNilai`(`id_rekap_nilai`) ON DELETE CASCADE ON UPDATE CASCADE;
