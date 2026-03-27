-- CreateTable
CREATE TABLE "EmailHistory" (
    "id" TEXT NOT NULL,
    "sentTo" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "EmailHistory_pkey" PRIMARY KEY ("id")
);
