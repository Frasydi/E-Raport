-- CreateTable
CREATE TABLE `Guru` (
    `id_guru` VARCHAR(191) NOT NULL,
    `nama_guru` VARCHAR(25) NOT NULL,
    `NSIP` VARCHAR(25) NOT NULL,
    `nama_kelas` ENUM('Kelompok A', 'Kelompok B') NOT NULL DEFAULT 'Kelompok A',

    PRIMARY KEY (`id_guru`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
