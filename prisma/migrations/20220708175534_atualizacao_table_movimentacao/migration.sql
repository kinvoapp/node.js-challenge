/*
  Warnings:

  - Added the required column `atualizado` to the `movimentacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movimentacoes" ADD COLUMN     "atualizado" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "data" SET DEFAULT CURRENT_TIMESTAMP;
