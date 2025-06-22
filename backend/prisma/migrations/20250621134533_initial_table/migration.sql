-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('Admin', 'Operator') NOT NULL DEFAULT 'Admin',
    `token` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Guru` (
    `id_guru` VARCHAR(191) NOT NULL,
    `nama_guru` VARCHAR(25) NOT NULL,
    `NSIP` VARCHAR(25) NOT NULL,
    `nama_kelas` ENUM('Kelompok A', 'Kelompok B') NOT NULL DEFAULT 'Kelompok A',

    PRIMARY KEY (`id_guru`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PesertaDidik` (
    `id_peserta_didik` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(50) NOT NULL,
    `nama_panggilan` VARCHAR(50) NULL,
    `nis` VARCHAR(50) NULL,
    `nisn` VARCHAR(50) NULL,
    `tempat_lahir` VARCHAR(50) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `jenis_kelamin` ENUM('Laki-Laki', 'Perempuan') NOT NULL DEFAULT 'Laki-Laki',
    `agama` ENUM('Islam', 'Kristen', 'Hindu', 'Buddha', 'Konghucu') NOT NULL DEFAULT 'Islam',
    `anakKe` INTEGER NULL,
    `nama_ayah` VARCHAR(50) NULL,
    `nama_ibu` VARCHAR(50) NULL,
    `nama_wali` VARCHAR(50) NULL,
    `pekerjaanAyah` VARCHAR(20) NULL,
    `pekerjaanIbu` VARCHAR(20) NULL,
    `jalan` VARCHAR(50) NULL,
    `desa_atau_kelurahan` VARCHAR(50) NULL,
    `kecamatan` VARCHAR(50) NULL,
    `kabupaten` VARCHAR(50) NULL,
    `provinsi` VARCHAR(50) NULL,

    PRIMARY KEY (`id_peserta_didik`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TahunAjaran` (
    `id_tahun_ajaran` VARCHAR(25) NOT NULL,
    `tahun_ajaran` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TahunAjaran_tahun_ajaran_key`(`tahun_ajaran`),
    PRIMARY KEY (`id_tahun_ajaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semester` (
    `id_semester` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `tahunAjaranId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Semester_nama_tahunAjaranId_key`(`nama`, `tahunAjaranId`),
    PRIMARY KEY (`id_semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RekapNilai` (
    `id_rekap_nilai` VARCHAR(191) NOT NULL,
    `pesertaDidikId` VARCHAR(191) NOT NULL,
    `tahunAjaranId` VARCHAR(191) NOT NULL,
    `guruId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_rekap_nilai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Semester` ADD CONSTRAINT `Semester_tahunAjaranId_fkey` FOREIGN KEY (`tahunAjaranId`) REFERENCES `TahunAjaran`(`id_tahun_ajaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RekapNilai` ADD CONSTRAINT `RekapNilai_pesertaDidikId_fkey` FOREIGN KEY (`pesertaDidikId`) REFERENCES `PesertaDidik`(`id_peserta_didik`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RekapNilai` ADD CONSTRAINT `RekapNilai_tahunAjaranId_fkey` FOREIGN KEY (`tahunAjaranId`) REFERENCES `TahunAjaran`(`id_tahun_ajaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RekapNilai` ADD CONSTRAINT `RekapNilai_guruId_fkey` FOREIGN KEY (`guruId`) REFERENCES `Guru`(`id_guru`) ON DELETE RESTRICT ON UPDATE CASCADE;
