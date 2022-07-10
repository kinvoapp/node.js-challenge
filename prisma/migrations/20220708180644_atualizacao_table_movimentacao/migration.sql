/*
  Warnings:

  - You are about to drop the column `atualizado` on the `movimentacoes` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `movimentacoes` table. All the data in the column will be lost.
  - Added the required column `dataAtualizacao` to the `movimentacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movimentacoes" DROP COLUMN "atualizado",
DROP COLUMN "data",
ADD COLUMN     "dataAtualizacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
