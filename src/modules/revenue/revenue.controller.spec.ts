import { Test, TestingModule } from '@nestjs/testing';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';

describe('RevenueController', () => {
  let controller: RevenueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenueController],
      providers: [RevenueService],
    }).compile();

    controller = module.get<RevenueController>(RevenueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
