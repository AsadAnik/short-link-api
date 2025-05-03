/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Link` DROP FOREIGN KEY `Link_userId_fkey`;

-- DropIndex
DROP INDEX `Link_userId_fkey` ON `Link`;

-- AlterTable
ALTER TABLE `Link` DROP COLUMN `ipAddress`,
    MODIFY `clicks` INTEGER NULL DEFAULT 0;
