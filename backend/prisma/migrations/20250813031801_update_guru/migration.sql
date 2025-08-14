/*
  Warnings:

  - You are about to drop the column `NSIP` on the `guru` table. All the data in the column will be lost.
  - Added the required column `NUPTK` to the `Guru` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guru` DROP COLUMN `NSIP`,
    ADD COLUMN `NUPTK` VARCHAR(25) NOT NULL;
