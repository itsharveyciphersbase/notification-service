import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  Notification,
  NotificationDocument,
} from '../notification/schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const createdNotification = new this.notificationModel(
      createNotificationDto,
    );
    return await createdNotification.save();
  }

  findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  findOne(id: string): Promise<Notification> {
    return this.notificationModel.findById(id).exec();
  }

  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const updatedNotification = await this.notificationModel.findById(id);
    updatedNotification.title = updateNotificationDto.title;
    updatedNotification.content = updateNotificationDto.content;
    updatedNotification.group = updateNotificationDto.group;
    updatedNotification.recieverId = updateNotificationDto.recieverId;
    updatedNotification.delivery = updateNotificationDto.delivery;
    return updatedNotification.save();
  }

  remove(id: string) {
    return this.notificationModel.findByIdAndDelete(id);
  }
}
