/*
  Warnings:

  - You are about to drop the column `adminId` on the `apikey` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `apikey` DROP FOREIGN KEY `ApiKey_adminId_fkey`;

-- AlterTable
ALTER TABLE `apikey` DROP COLUMN `adminId`;
