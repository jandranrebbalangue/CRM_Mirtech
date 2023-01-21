-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" TEXT,
    "updatedAt" TEXT,
    "contact" INTEGER NOT NULL,
    "organization" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedUser" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Clients" ("assignedUser", "contact", "createdAt", "id", "name", "organization", "status", "updatedAt") SELECT coalesce("assignedUser", '') AS "assignedUser", "contact", "createdAt", "id", "name", "organization", "status", "updatedAt" FROM "Clients";
DROP TABLE "Clients";
ALTER TABLE "new_Clients" RENAME TO "Clients";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
