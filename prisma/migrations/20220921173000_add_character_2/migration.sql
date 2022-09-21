-- AlterTable
ALTER TABLE `characters` ADD COLUMN `peliculaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `characters` ADD CONSTRAINT `characters_peliculaId_fkey` FOREIGN KEY (`peliculaId`) REFERENCES `movies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
