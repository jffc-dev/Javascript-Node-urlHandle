/*
  Warnings:

  - The primary key for the `ResourceParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `flagId` on the `ResourceParticipant` table. All the data in the column will be lost.
  - Added the required column `participantId` to the `ResourceParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResourceParticipant" DROP CONSTRAINT "ResourceParticipant_flagId_fkey";

-- AlterTable
ALTER TABLE "ResourceParticipant" DROP CONSTRAINT "ResourceParticipant_pkey",
DROP COLUMN "flagId",
ADD COLUMN     "participantId" INTEGER NOT NULL,
ADD CONSTRAINT "ResourceParticipant_pkey" PRIMARY KEY ("resourceId", "participantId");

-- AddForeignKey
ALTER TABLE "ResourceParticipant" ADD CONSTRAINT "ResourceParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
