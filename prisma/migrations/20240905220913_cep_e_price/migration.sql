/*
  Warnings:

  - You are about to drop the column `location` on the `imoveis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `imoveis` DROP COLUMN `location`,
    ADD COLUMN `cep` VARCHAR(191) NULL,
    ADD COLUMN `cidade` VARCHAR(191) NULL,
    ADD COLUMN `complemento` VARCHAR(191) NULL,
    ADD COLUMN `logradouro` VARCHAR(191) NULL,
    ADD COLUMN `numero` VARCHAR(191) NULL,
    ADD COLUMN `uf` VARCHAR(191) NULL;
