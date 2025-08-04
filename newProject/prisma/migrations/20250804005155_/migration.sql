/*
  Warnings:

  - You are about to drop the column `active` on the `Resource` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('PENDING', 'APPROVED', 'DELETED');

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "active",
ADD COLUMN     "status" "ResourceStatus" NOT NULL DEFAULT 'PENDING';
