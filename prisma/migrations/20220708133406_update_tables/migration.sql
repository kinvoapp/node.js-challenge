/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Spend` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Income" ("createdAt", "id", "name", "value") SELECT "createdAt", "id", "name", "value" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
CREATE TABLE "new_Spend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Spend" ("createdAt", "id", "name", "value") SELECT "createdAt", "id", "name", "value" FROM "Spend";
DROP TABLE "Spend";
ALTER TABLE "new_Spend" RENAME TO "Spend";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
