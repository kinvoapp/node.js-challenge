/*
  Warnings:

  - You are about to alter the column `value` on the `Income` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `value` on the `Spend` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Income" ("createdAt", "id", "name", "updatedAt", "value") SELECT "createdAt", "id", "name", "updatedAt", "value" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
CREATE TABLE "new_Spend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Spend" ("createdAt", "id", "name", "updatedAt", "value") SELECT "createdAt", "id", "name", "updatedAt", "value" FROM "Spend";
DROP TABLE "Spend";
ALTER TABLE "new_Spend" RENAME TO "Spend";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
