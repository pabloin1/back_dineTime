/*
  Warnings:

  - Added the required column `puntaje` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Producto` ADD COLUMN `puntaje` INTEGER NOT NULL;
