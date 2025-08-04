/*
  Warnings:

  - You are about to drop the `ResourceFlag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResourceFlag" DROP CONSTRAINT "ResourceFlag_flagId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceFlag" DROP CONSTRAINT "ResourceFlag_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceParticipant" DROP CONSTRAINT "ResourceParticipant_participantId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceParticipant" DROP CONSTRAINT "ResourceParticipant_resourceId_fkey";

-- DropTable
DROP TABLE "ResourceFlag";

-- DropTable
DROP TABLE "ResourceParticipant";

-- CreateTable
CREATE TABLE "_ResourceFlags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ResourceFlags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ResourceParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ResourceParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ResourceFlags_B_index" ON "_ResourceFlags"("B");

-- CreateIndex
CREATE INDEX "_ResourceParticipants_B_index" ON "_ResourceParticipants"("B");

-- AddForeignKey
ALTER TABLE "_ResourceFlags" ADD CONSTRAINT "_ResourceFlags_A_fkey" FOREIGN KEY ("A") REFERENCES "Flag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceFlags" ADD CONSTRAINT "_ResourceFlags_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceParticipants" ADD CONSTRAINT "_ResourceParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceParticipants" ADD CONSTRAINT "_ResourceParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
