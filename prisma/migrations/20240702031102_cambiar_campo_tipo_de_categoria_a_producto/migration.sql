/*
  Warnings:

  - You are about to drop the column `tipo` on the `categorias` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tipo]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tipo` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Categorias_tipo_key` ON `Categorias`;

-- AlterTable
ALTER TABLE `Categorias` DROP COLUMN `tipo`;

-- AlterTable
ALTER TABLE `Producto` ADD COLUMN `tipo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Producto_tipo_key` ON `Producto`(`tipo`);
