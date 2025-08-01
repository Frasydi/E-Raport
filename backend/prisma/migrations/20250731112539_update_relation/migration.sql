-- AddForeignKey
ALTER TABLE `Kesimpulan` ADD CONSTRAINT `Kesimpulan_id_rekap_nilai_fkey` FOREIGN KEY (`id_rekap_nilai`) REFERENCES `RekapNilai`(`id_rekap_nilai`) ON DELETE CASCADE ON UPDATE CASCADE;
