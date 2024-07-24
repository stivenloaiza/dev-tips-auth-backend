import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type LogDocument = Log & Document;

@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop({ required: true })
  system_name: string;

  @Prop({ required: true })
  method: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  requestBody: any;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  responseBody: any;

  @Prop()
  statusCode: number;

  @Prop()
  timestamp: Date;

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

export const LogSchema = SchemaFactory.createForClass(Log);
