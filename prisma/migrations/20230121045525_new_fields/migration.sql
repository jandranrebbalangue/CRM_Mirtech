-- CreateTable
CREATE TABLE "Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "contact" INTEGER NOT NULL,
    "organization" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
