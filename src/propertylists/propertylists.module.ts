import { Module } from '@nestjs/common';
import { PropertylistsService } from './propertylists.service';
import { PropertylistsController } from './propertylists.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Propertylist, PropertySchema } from './entities/propertylist.entity';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Propertylist.name, schema: PropertySchema}])

  ],
  controllers: [PropertylistsController],
  providers: [PropertylistsService]
})
export class PropertylistsModule {}
