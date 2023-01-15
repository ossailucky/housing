import { Module } from '@nestjs/common';
import { SubcribeService } from './subcribe.service';
import { SubcribeController } from './subcribe.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './entities/subcribe.entity';

@Module({
  imports:[
    UserModule,
    MongooseModule.forFeature([{name: Subscription.name, schema: SubscriptionSchema}])
  ],
  controllers: [SubcribeController],
  providers: [SubcribeService]
})
export class SubcribeModule {}
