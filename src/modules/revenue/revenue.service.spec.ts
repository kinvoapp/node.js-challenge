import { Test, TestingModule } from '@nestjs/testing';
import { RevenueService } from './revenue.service';

describe('RevenueService', () => {
  let service: RevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenueService],
    }).compile();

    service = module.get<RevenueService>(RevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
