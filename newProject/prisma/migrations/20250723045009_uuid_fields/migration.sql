/*
  Warnings:

  - The `uuid` column on the `Flag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uuid` column on the `Participant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uuid` column on the `Rating` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uuid` column on the `Resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uuid` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Flag" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "Flag_uuid_key" ON "Flag"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_uuid_key" ON "Participant"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_uuid_key" ON "Rating"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_uuid_key" ON "Resource"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");
