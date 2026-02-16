/*
  Warnings:

  - The primary key for the `GoogleUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."GoogleUser" DROP CONSTRAINT "GoogleUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GoogleUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GoogleUser_id_seq";

-- AlterTable
ALTER TABLE "public"."Token" DROP CONSTRAINT "Token_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Token_id_seq";
