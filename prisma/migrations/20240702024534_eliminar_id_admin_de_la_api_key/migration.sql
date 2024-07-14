/*
  Warnings:

  - You are about to drop the column `adminId` on the `apikey` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ApiKey` DROP FOREIGN KEY `ApiKey_adminId_fkey`;

-- AlterTable
ALTER TABLE `ApiKey` DROP COLUMN `adminId`;
