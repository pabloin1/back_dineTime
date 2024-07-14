/*
  Warnings:

  - You are about to drop the column `id_mesa` on the `reservaciones` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reservaciones` DROP FOREIGN KEY `Reservaciones_id_mesa_fkey`;

-- AlterTable
ALTER TABLE `Reservaciones` DROP COLUMN `id_mesa`;
