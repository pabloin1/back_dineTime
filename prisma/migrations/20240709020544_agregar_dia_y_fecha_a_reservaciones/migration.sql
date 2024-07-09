/*
  Warnings:

  - Added the required column `dia` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservaciones` ADD COLUMN `dia` VARCHAR(191) NOT NULL,
    ADD COLUMN `fecha` VARCHAR(191) NOT NULL;
