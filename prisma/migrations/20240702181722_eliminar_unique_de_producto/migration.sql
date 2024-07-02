-- DropIndex
DROP INDEX `Producto_tipo_key` ON `producto`;

-- CreateTable
CREATE TABLE `Mesero` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
