import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateLogDto {
  @ApiProperty()
  @IsString()
  ip: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  endpoint: string;

  @ApiProperty()
  @IsString()
  system_name: string;

  @ApiProperty()
  @IsString()
  method: string;

  @ApiProperty()
  @IsObject()
  requestBody: any;

  @ApiProperty()
  @IsObject()
  responseBody: any;

  @IsNumber()
  @IsOptional()
  statusCode: number;

  @IsDate()
  @IsOptional()
  timestamp: Date;

  @IsOptional()
  @IsDate()
  createdAt?: Date | null;

  @IsOptional()
  @IsString()
  createBy?: string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @IsOptional()
  @IsString()
  updateBy?: string;

  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @IsOptional()
  @IsString()
  deleteBy?: string;
}
