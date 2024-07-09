/*
  Warnings:

  - Added the required column `urlImg` to the `Mesero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mesero` ADD COLUMN `urlImg` VARCHAR(191) NOT NULL;
