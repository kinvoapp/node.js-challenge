import { Controller, Get, Param } from '@nestjs/common';
import { FinalService } from './final.service';

@Controller('api/final')
export class FinalController {
  constructor(private readonly finalService: FinalService) {}

  @Get(':dataInicial/:dataFinal')
  async findMany(@Param('dataInicial') dataInicial: Date,@Param('dataFinal') dataFinal: Date){
    return this.finalService.findMany(dataInicial,dataFinal)
  }

  @Get(':dataInicial/:dataFinal/:page')
  async findPagination(@Param('dataInicial') dataInicial: Date, @Param('dataFinal') dataFinal: Date, @Param('page') page: number){
    return this.finalService.findPagination(dataInicial,dataFinal,page)
  }

}
