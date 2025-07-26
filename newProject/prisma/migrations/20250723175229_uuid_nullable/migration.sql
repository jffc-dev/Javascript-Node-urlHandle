-- AlterTable
ALTER TABLE "Flag" ALTER COLUMN "uuid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "uuid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "uuid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "uuid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "uuid" DROP NOT NULL;
