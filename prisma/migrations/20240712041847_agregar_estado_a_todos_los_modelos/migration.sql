-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Categorias` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Cuenta` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Mesas` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Mesero` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Reservaciones` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Ventas` ADD COLUMN `estado` BOOLEAN NOT NULL DEFAULT true;
