/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `categorias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `producto` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Producto` DROP FOREIGN KEY `Producto_categoriaId_fkey`;

-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Categorias` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Producto` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `categoriaId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Reservaciones` (
    `id` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `fecha` VARCHAR(191) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `pago` DOUBLE NOT NULL,
    `id_mesa` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas` (
    `id` INTEGER NOT NULL,
    `id_producto` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_Fn` DOUBLE NOT NULL,
    `id_mesa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesas` (
    `id` VARCHAR(191) NOT NULL,
    `num_mesa` INTEGER NOT NULL,
    `num_sillas` INTEGER NOT NULL,
    `id_admin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservaciones` ADD CONSTRAINT `Reservaciones_id_mesa_fkey` FOREIGN KEY (`id_mesa`) REFERENCES `Mesas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `Ventas_id_mesa_fkey` FOREIGN KEY (`id_mesa`) REFERENCES `Mesas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `Ventas_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mesas` ADD CONSTRAINT `Mesas_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
