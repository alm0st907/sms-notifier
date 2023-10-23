import { Test, TestingModule } from '@nestjs/testing';
import { companiesService } from './companies.service';

describe('companiesService', () => {
  let service: companiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [companiesService],
    }).compile();

    service = module.get<companiesService>(companiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
