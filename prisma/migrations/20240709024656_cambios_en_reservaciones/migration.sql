/*
  Warnings:

  - You are about to drop the column `amoutOfpeople` on the `reservaciones` table. All the data in the column will be lost.
  - You are about to drop the column `pago` on the `reservaciones` table. All the data in the column will be lost.
  - Added the required column `amountOfPeople` to the `Reservaciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservaciones` DROP COLUMN `amoutOfpeople`,
    DROP COLUMN `pago`,
    ADD COLUMN `amountOfPeople` INTEGER NOT NULL;
