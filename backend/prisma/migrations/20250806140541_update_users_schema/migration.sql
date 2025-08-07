/*
  Warnings:

  - You are about to drop the column `website` on the `profilsekolah` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `profilsekolah` DROP COLUMN `website`;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('Operator', 'Ortu') NOT NULL DEFAULT 'Operator';
