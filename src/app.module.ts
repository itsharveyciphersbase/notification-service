import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [NotificationModule, MongooseModule.forRoot('mongodb://mongo/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
