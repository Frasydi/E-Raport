-- AlterTable
ALTER TABLE `guru` MODIFY `nama_kelas` ENUM('Kelompok A', 'Kelompok B') NULL;

-- AlterTable
ALTER TABLE `pesertadidik` MODIFY `jenis_kelamin` ENUM('Laki-Laki', 'Perempuan') NULL,
    MODIFY `agama` ENUM('Islam', 'Kristen', 'Hindu', 'Buddha', 'Konghucu') NULL;
