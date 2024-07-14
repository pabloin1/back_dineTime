/*
  Warnings:

  - You are about to drop the column `apelido` on the `reservaciones` table. All the data in the column will be lost.
  - Added the required column `apellido` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservaciones` DROP COLUMN `apelido`,
    ADD COLUMN `apellido` VARCHAR(191) NOT NULL;
