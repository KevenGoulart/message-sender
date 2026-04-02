/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Receiver` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receiver_email_key" ON "Receiver"("email");
