-- CreateTable
CREATE TABLE `Kesimpulan` (
    `id_kesimpulan` VARCHAR(191) NOT NULL,
    `id_rekap_nilai` VARCHAR(191) NOT NULL,
    `pencapaian_perkembangan_baik` VARCHAR(191) NOT NULL,
    `pencapaian_perkembangan_buruk` VARCHAR(191) NOT NULL,
    `pencapaian_perkembangan_perlu_dilatih` VARCHAR(191) NOT NULL,
    `saran_dan_masukan` TEXT NOT NULL,

    UNIQUE INDEX `Kesimpulan_id_rekap_nilai_key`(`id_rekap_nilai`),
    PRIMARY KEY (`id_kesimpulan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
