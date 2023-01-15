import { Module } from '@nestjs/common';
import { SubcribeService } from './subcribe.service';
import { SubcribeController } from './subcribe.controller';

@Module({
  controllers: [SubcribeController],
  providers: [SubcribeService]
})
export class SubcribeModule {}
