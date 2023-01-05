import { Test, TestingModule } from '@nestjs/testing';
import { PropertylistsController } from './propertylists.controller';
import { PropertylistsService } from './propertylists.service';

describe('PropertylistsController', () => {
  let controller: PropertylistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertylistsController],
      providers: [PropertylistsService],
    }).compile();

    controller = module.get<PropertylistsController>(PropertylistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
