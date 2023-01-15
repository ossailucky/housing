import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';
import { MulterModule } from '@nestjs/platform-express/multer';
import { PropertylistsModule } from './propertylists/propertylists.module';
import { SubcribeModule } from './subcribe/subcribe.module';

@Module({
  imports: [ 
    MongooseModule.forRoot(process.env.MONGODB_CONNECT),
    MulterModule.register({
      dest: "./uploads",
    }),
    UserModule,
    AuthModule,
    PropertylistsModule,
    SubcribeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
