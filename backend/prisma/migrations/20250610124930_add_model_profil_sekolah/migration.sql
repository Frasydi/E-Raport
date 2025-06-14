-- CreateTable
CREATE TABLE `ProfilSekolah` (
    `id_profil_sekolah` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_sekolah` VARCHAR(100) NOT NULL,
    `NPSN` VARCHAR(20) NULL,
    `NSS` VARCHAR(20) NULL,
    `provinsi` VARCHAR(50) NOT NULL,
    `kabupaten` VARCHAR(50) NOT NULL,
    `kecamatan` VARCHAR(50) NOT NULL,
    `desa` VARCHAR(50) NULL,
    `jalan` VARCHAR(100) NOT NULL,
    `kode_pos` VARCHAR(10) NOT NULL,
    `nomor_hp` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `website` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProfilSekolah_NPSN_key`(`NPSN`),
    UNIQUE INDEX `ProfilSekolah_NSS_key`(`NSS`),
    UNIQUE INDEX `ProfilSekolah_email_key`(`email`),
    PRIMARY KEY (`id_profil_sekolah`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
