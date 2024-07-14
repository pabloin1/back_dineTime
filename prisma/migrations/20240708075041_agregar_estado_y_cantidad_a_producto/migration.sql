/*
  Warnings:

  - Added the required column `cantidad` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Producto` ADD COLUMN `cantidad` INTEGER NOT NULL,
    ADD COLUMN `estado` BOOLEAN NOT NULL;
