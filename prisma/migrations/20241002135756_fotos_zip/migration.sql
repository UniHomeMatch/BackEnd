/*
  Warnings:

  - You are about to drop the `imagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `imagem` DROP FOREIGN KEY `Imagem_imobiId_fkey`;

-- AlterTable
ALTER TABLE `imoveis` ADD COLUMN `images` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `imagem`;
