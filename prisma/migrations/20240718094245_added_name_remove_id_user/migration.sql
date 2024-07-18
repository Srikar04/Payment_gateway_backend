/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_transactionOwner_fkey`;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT 'Default Name',
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_transactionOwner_fkey` FOREIGN KEY (`transactionOwner`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
