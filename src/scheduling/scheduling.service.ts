import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';


@Injectable()
export class SchedulingService {
  constructor( private readonly userService: UserService){}
  
  
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateSubCount() {
     await this.userService.checkDay();
  }

}
