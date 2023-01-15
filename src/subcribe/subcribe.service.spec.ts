import { Test, TestingModule } from '@nestjs/testing';
import { SubcribeService } from './subcribe.service';

describe('SubcribeService', () => {
  let service: SubcribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcribeService],
    }).compile();

    service = module.get<SubcribeService>(SubcribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
