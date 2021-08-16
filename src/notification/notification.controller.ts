import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Notification } from '../notification/schemas/notification.schema';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationService.create(createNotificationDto);
    this.client.emit('notification', notification);
    return notification;
  }

  @Get()
  findAll() {
    // this.client.emit('hello', 'Hello from RMQ');
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }

  @MessagePattern('notification')
  async getNotifications(
    @Payload() data: Notification,
    @Ctx() context: RmqContext,
  ) {
    console.log('#############################');
    console.log(data);
    // console.log(`Pattern: ${context.getPattern()}`);
    // console.log(context.getMessage());
  }
}
