-- CreateTable
CREATE TABLE "saldo" (
    "id" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "saldoAnterior" DOUBLE PRECISION NOT NULL,
    "dataAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saldo_pkey" PRIMARY KEY ("id")
);
