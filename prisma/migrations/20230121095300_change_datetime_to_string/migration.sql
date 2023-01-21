-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,
    "organization" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Clients" ("contact", "createdAt", "id", "name", "organization", "status", "updatedAt") SELECT "contact", "createdAt", "id", "name", "organization", "status", "updatedAt" FROM "Clients";
DROP TABLE "Clients";
ALTER TABLE "new_Clients" RENAME TO "Clients";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
