-- CreateTable
CREATE TABLE `Refer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ReferrerName` VARCHAR(50) NOT NULL,
    `ReferrerEmail` VARCHAR(100) NOT NULL,
    `ReferrerPhone` BIGINT NOT NULL,
    `SenderName` VARCHAR(50) NOT NULL,
    `SenderEmail` VARCHAR(100) NOT NULL,
    `SenderPhone` BIGINT NOT NULL,
    `SenderMessage` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
