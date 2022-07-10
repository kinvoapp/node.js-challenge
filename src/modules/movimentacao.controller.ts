import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovimentacaoDTO } from './carteira.dto';
import { MovimentacaoService } from './movimentacao.service';

@Controller('api/movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) {}

  @Post()
  async create(@Body() data: MovimentacaoDTO) {
    return this.movimentacaoService.create(data)
  }

  @Get()
  async findMany(){
    return this.movimentacaoService.findMany()
  }

  @Get(':page')
  async findPagination(@Param('page') page: number){
    return this.movimentacaoService.findPagination(page)
  }
  
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: MovimentacaoDTO) {
    return this.movimentacaoService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.movimentacaoService.delete(id)
  }
}
