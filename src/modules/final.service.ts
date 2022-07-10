import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FinalService {
  constructor(private prisma: PrismaService){}

  async findMany(dataInicial: Date, dataFinal: Date) {
    const movimentacao = this.prisma.movimentacao.findMany({
      where: {
        AND: [{
          dataCadastro: {
            gte: new Date(
              dataInicial
            )
          }
        },

          {
          dataCadastro: {
            lte: new Date(
              dataFinal
            )
          }
        }
      ]},
      
      orderBy: [{
        dataCadastro: 'desc'
      }]
    })
    return movimentacao
  }

  async findPagination(dataInicial: Date, dataFinal: Date, page: number) {
    const movimentacao = this.prisma.movimentacao.findMany({
      skip: (+page-1)*10,
      take: 10,
      where: {
        AND: [{
          dataCadastro: {
            gte: new Date(
              dataInicial
            )
          }
        },

          {
          dataCadastro: {
            lte: new Date(
              dataFinal
            )
          }
        }
      ]},
      
      orderBy: [{
        dataCadastro: 'desc'
      }]
    })
    return movimentacao
  }

}
