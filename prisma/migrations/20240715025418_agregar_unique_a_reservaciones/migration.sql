/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `Ventas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Ventas_createdAt_key` ON `Ventas`(`createdAt`);
