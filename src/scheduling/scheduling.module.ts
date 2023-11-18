import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulingService } from './scheduling.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    ScheduleModule.forRoot()],
  providers: [SchedulingService],
})
export class SchedulingModule {}
