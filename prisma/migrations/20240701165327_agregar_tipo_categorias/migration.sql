/*
  Warnings:

  - You are about to alter the column `tipo` on the `categorias` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[tipo]` on the table `Categorias` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Categorias` MODIFY `tipo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Categorias_tipo_key` ON `Categorias`(`tipo`);
