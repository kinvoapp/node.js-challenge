import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { MovimentacaoDTO } from './carteira.dto';

@Injectable()
export class MovimentacaoService {
  constructor(private prisma: PrismaService){}

  async create(data: MovimentacaoDTO) {
    const movimentacao = await this.prisma.movimentacao.create({
      data,
    })
    return movimentacao
  }

  async findMany() {
    const movimentacao = this.prisma.movimentacao.findMany({
      orderBy: [{
        dataCadastro: 'asc',
      }]
    })
    return movimentacao
  }
  
  async findPagination(page: number) {
    const movimentacao = this.prisma.movimentacao.findMany({
      skip: (+page-1)*10,
      take: 10,
      orderBy: [{
        dataCadastro: 'asc'
      }]
    })
    return movimentacao
  }

  async update(id: string, data: MovimentacaoDTO) {
    const movimentacaoExiste = await this.prisma.movimentacao.findUnique({
      where: {
        id,
      }
    })
    if (!movimentacaoExiste) {
      throw new Error('Movimentação não existe! Confira se não há erro.')
    }
    return await this.prisma.movimentacao.update({
      data,
      where: {
        id,
      }
    })
  }

  async delete(id: string) {
    const movimentacaoExiste = await this.prisma.movimentacao.findUnique({
      where: {
        id,
      }
    })
    if (!movimentacaoExiste) {
      throw new Error('Movimentação não existe! Confira se não há erro.')
    }
    return await this.prisma.movimentacao.delete({
      where: {
        id,
      }
    })
  }
}
