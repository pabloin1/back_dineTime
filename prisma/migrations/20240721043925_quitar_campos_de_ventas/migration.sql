/*
  Warnings:

  - You are about to drop the column `cantidad` on the `Ventas` table. All the data in the column will be lost.
  - You are about to drop the column `id_producto` on the `Ventas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ventas` DROP FOREIGN KEY `Ventas_id_producto_fkey`;

-- AlterTable
ALTER TABLE `Ventas` DROP COLUMN `cantidad`,
    DROP COLUMN `id_producto`;
