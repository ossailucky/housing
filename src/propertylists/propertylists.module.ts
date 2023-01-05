import { Module } from '@nestjs/common';
import { PropertylistsService } from './propertylists.service';
import { PropertylistsController } from './propertylists.controller';

@Module({
  controllers: [PropertylistsController],
  providers: [PropertylistsService]
})
export class PropertylistsModule {}
