import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApiKeySubscriptionDocument = ApiKeySubscription & Document;

@Schema()
export class ApiKeySubscription {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  apiKey: string;

  @Prop({ default: 0 })
  usageCount: number;

  @Prop({ required: true })
  limit: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: null })
  createdAt: Date | null;

  @Prop()
  createBy: string;

  @Prop({ default: null })
  updatedAt: Date | null;

  @Prop()
  updateBy: string;

  @Prop({ default: null })
  deletedAt: Date | null;

  @Prop()
  deleteBy: string;
}

export const ApiKeySubscriptionSchema =
  SchemaFactory.createForClass(ApiKeySubscription);
