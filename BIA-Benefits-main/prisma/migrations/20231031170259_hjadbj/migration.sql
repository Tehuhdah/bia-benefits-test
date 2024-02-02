/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Business_email_key" ON "Business"("email");
