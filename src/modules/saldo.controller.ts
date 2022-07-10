import { Controller, Get } from '@nestjs/common';
import { SaldoService } from './saldo.service';

@Controller('api/saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Get()
  async findSaldo(){
    return this.saldoService.findSaldo()
  }

}
