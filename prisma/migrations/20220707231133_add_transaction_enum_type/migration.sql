-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('credit', 'debit');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "type" "transaction_type" NOT NULL DEFAULT 'debit';
