/*
  Warnings:

  - Changed the type of `tokenType` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."TOKEN_TYPE" AS ENUM ('SIGNUP', 'FORGOT_PASSWORD', 'EMAIL_VERIFICATION');

-- AlterTable
ALTER TABLE "public"."Token" DROP COLUMN "tokenType",
ADD COLUMN     "tokenType" "public"."TOKEN_TYPE" NOT NULL;
