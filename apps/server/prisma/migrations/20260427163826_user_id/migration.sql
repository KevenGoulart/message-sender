/*
  Warnings:

  - Added the required column `userId` to the `EmailHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ReceiversGroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailHistory" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "ReceiversGroups" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EmailHistory" ADD CONSTRAINT "EmailHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiversGroups" ADD CONSTRAINT "ReceiversGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
