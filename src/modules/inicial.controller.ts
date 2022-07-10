import { Controller, Get, Param } from '@nestjs/common';
import { InicialService } from './inicial.service';

@Controller('api/inicial')
export class InicialController {
  constructor(private readonly inicialService: InicialService) {}

  @Get(':dataInicial/:dataFinal')
  async findMany(@Param('dataInicial') dataInicial: Date, @Param('dataFinal') dataFinal: Date){
    return this.inicialService.findMany(dataInicial,dataFinal)
  }

  @Get(':dataInicial/:dataFinal/:page')
  async findPagination(@Param('dataInicial') dataInicial: Date, @Param('dataFinal') dataFinal: Date, @Param('page') page: number){
    return this.inicialService.findPagination(dataInicial,dataFinal,page)
  }

}
