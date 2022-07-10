/*
  Warnings:

  - You are about to alter the column `valor` on the `movimentacoes` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Added the required column `dataAtualizacao` to the `movimentacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movimentacoes" ADD COLUMN     "dataAtualizacao" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "valor" SET DATA TYPE DOUBLE PRECISION;
