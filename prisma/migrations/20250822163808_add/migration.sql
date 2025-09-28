-- CreateEnum
CREATE TYPE "public"."ACCESS" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."TOKEN_STATUS" AS ENUM ('VALIDATE', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."ROLE" AS ENUM ('ADMIN', 'SUBADMIN', 'USER', 'GOOGLEUSER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."ROLE" NOT NULL DEFAULT 'USER',
    "status" BOOLEAN NOT NULL,
    "jwtToken" TEXT,
    "access" "public"."ACCESS" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GoogleUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "role" "public"."ROLE" NOT NULL DEFAULT 'GOOGLEUSER',
    "status" BOOLEAN NOT NULL,
    "jwtToken" TEXT,
    "access" "public"."ACCESS" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "GoogleUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "tokenType" TEXT NOT NULL,
    "tokenStatus" "public"."TOKEN_STATUS" NOT NULL DEFAULT 'VALIDATE',
    "expiresIn" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleUser_email_key" ON "public"."GoogleUser"("email");
