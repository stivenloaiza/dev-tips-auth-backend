import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
  IsISO8601,
} from 'class-validator';

export class CreateApiKeySubscriptionDto {
  @ApiProperty({
    description: 'Type of the API key subscription',
    example: 'basic',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  apiKey?: string;

  @ApiProperty({
    description: 'Usage count of the API key subscription',
    example: 0,
    required: false,
  })
  @IsInt()
  @IsOptional()
  usageCount?: number = 0;

  @ApiProperty({
    description: 'Usage limit for the API key subscription',
    example: 100,
  })
  @IsInt()
  @IsNotEmpty()
  limit: number;

 
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

 
  @IsISO8601()
  @IsOptional()
  createdAt?: Date | null = null;


  @IsString()
  @IsOptional()
  createBy?: string;


  @IsISO8601()
  @IsOptional()
  updatedAt?: Date | null = null;

 
  @IsString()
  @IsOptional()
  updateBy?: string;


  @IsISO8601()
  @IsOptional()
  deletedAt?: Date | null = null;


  @IsString()
  @IsOptional()
  deleteBy?: string;
}
