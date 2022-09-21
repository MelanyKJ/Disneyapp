/*
  Warnings:

  - You are about to drop the column `idPelicula` on the `characters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `characters` DROP FOREIGN KEY `characters_idPelicula_fkey`;

-- AlterTable
ALTER TABLE `characters` DROP COLUMN `idPelicula`;

-- CreateTable
CREATE TABLE `MovieOnCharacter` (
    `characterId` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,

    PRIMARY KEY (`characterId`, `movieId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieOnCharacter` ADD CONSTRAINT `MovieOnCharacter_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `characters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieOnCharacter` ADD CONSTRAINT `MovieOnCharacter_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `movies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
