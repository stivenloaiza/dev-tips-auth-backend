import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserLogsDocument = UserLogs & Document;

@Schema({ timestamps: true })
export class UserLogs {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  system_name: string;

  @Prop({ required: true })
  apiKey: string;

  @Prop({ default: 0 })
  requestCount: number;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: null })
  blockedAt: Date;

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

export const UserLogsSchema = SchemaFactory.createForClass(UserLogs);
