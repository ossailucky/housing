import { Test, TestingModule } from '@nestjs/testing';
import { PropertylistsService } from './propertylists.service';

describe('PropertylistsService', () => {
  let service: PropertylistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertylistsService],
    }).compile();

    service = module.get<PropertylistsService>(PropertylistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
