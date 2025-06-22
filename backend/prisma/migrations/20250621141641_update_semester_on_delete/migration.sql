-- DropForeignKey
ALTER TABLE `semester` DROP FOREIGN KEY `Semester_tahunAjaranId_fkey`;

-- DropIndex
DROP INDEX `Semester_tahunAjaranId_fkey` ON `semester`;

-- AddForeignKey
ALTER TABLE `Semester` ADD CONSTRAINT `Semester_tahunAjaranId_fkey` FOREIGN KEY (`tahunAjaranId`) REFERENCES `TahunAjaran`(`id_tahun_ajaran`) ON DELETE CASCADE ON UPDATE CASCADE;
