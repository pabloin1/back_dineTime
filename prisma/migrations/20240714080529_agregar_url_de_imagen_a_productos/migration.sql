/*
  Warnings:

  - Added the required column `urlimg` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `producto` ADD COLUMN `urlimg` VARCHAR(191) NOT NULL;
