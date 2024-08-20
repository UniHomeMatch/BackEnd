-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `generoId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_cpf_key`(`cpf`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imoveis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `thumb` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `area` VARCHAR(191) NULL,
    `bedrooms` VARCHAR(191) NULL,
    `bathrooms` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genero` (
    `id_genero` INTEGER NOT NULL AUTO_INCREMENT,
    `genero` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_genero`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `genero`(`id_genero`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imoveis` ADD CONSTRAINT `imoveis_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
