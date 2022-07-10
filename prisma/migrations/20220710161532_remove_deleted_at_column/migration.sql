/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "deletedAt";
