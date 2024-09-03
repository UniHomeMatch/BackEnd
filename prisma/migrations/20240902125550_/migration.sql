/*
  Warnings:

  - You are about to alter the column `price` on the `imoveis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `area` on the `imoveis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `imoveis` MODIFY `price` INTEGER NULL,
    MODIFY `area` INTEGER NULL;
