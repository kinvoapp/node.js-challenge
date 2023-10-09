-- CreateEnum
CREATE TYPE "transactionType" AS ENUM ('IN', 'OUT');

-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "transactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);
