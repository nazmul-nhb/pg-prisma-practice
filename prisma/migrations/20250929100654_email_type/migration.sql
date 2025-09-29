/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(64);
