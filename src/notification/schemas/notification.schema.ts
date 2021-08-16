import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  delivery: string;

  @Prop({ required: true })
  group: boolean;

  @Prop({ required: true })
  recieverId: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
