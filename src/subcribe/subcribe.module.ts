import { Module } from '@nestjs/common';
import { SubcribeService } from './subcribe.service';
import { SubcribeController } from './subcribe.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './entities/subcribe.entity';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports:[
    UserModule,
    TransactionsModule,
    MongooseModule.forFeature([{name: Subscription.name, schema: SubscriptionSchema}])
  ],
  controllers: [SubcribeController],
  providers: [SubcribeService],
  exports:[ SubcribeService ]
})
export class SubcribeModule {}
