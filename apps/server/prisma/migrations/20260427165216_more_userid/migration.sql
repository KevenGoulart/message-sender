-- AlterTable
ALTER TABLE "Receiver" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Receiver" ADD CONSTRAINT "Receiver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
