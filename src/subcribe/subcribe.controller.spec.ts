import { Test, TestingModule } from '@nestjs/testing';
import { SubcribeController } from './subcribe.controller';
import { SubcribeService } from './subcribe.service';

describe('SubcribeController', () => {
  let controller: SubcribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcribeController],
      providers: [SubcribeService],
    }).compile();

    controller = module.get<SubcribeController>(SubcribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
