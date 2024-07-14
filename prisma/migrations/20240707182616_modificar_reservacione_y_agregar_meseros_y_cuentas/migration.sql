/*
  Warnings:

  - You are about to drop the column `id_usuario` on the `reservaciones` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Mesero` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apellido` to the `Mesero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Mesero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amoutOfpeople` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apelido` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Mesero` ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Reservaciones` DROP COLUMN `id_usuario`,
    ADD COLUMN `amoutOfpeople` INTEGER NOT NULL,
    ADD COLUMN `apelido` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Cuenta` (
    `id` VARCHAR(191) NOT NULL,
    `id_mesero` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `pagado` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Mesero_email_key` ON `Mesero`(`email`);

-- AddForeignKey
ALTER TABLE `Cuenta` ADD CONSTRAINT `Cuenta_id_mesero_fkey` FOREIGN KEY (`id_mesero`) REFERENCES `Mesero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
