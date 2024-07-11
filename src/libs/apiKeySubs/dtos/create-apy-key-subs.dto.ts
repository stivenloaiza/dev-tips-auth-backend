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

  @ApiProperty({
    description: 'API key for the subscription',
    example: 'abc123',
  })
  @IsString()
  @IsNotEmpty()
  apiKey: string;

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

  @ApiProperty({
    description: 'Status of the API key subscription',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({
    description: 'Creation date of the subscription',
    example: '2023-07-11T00:00:00.000Z',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  createdAt?: Date | null = null;

  @ApiProperty({
    description: 'User who created the subscription',
    example: 'user1',
    required: false,
  })
  @IsString()
  @IsOptional()
  createBy?: string;

  @ApiProperty({
    description: 'Last updated date of the subscription',
    example: '2023-07-12T00:00:00.000Z',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  updatedAt?: Date | null = null;

  @ApiProperty({
    description: 'User who last updated the subscription',
    example: 'user2',
    required: false,
  })
  @IsString()
  @IsOptional()
  updateBy?: string;

  @ApiProperty({
    description: 'Deletion date of the subscription',
    example: '2023-07-13T00:00:00.000Z',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  deletedAt?: Date | null = null;

  @ApiProperty({
    description: 'User who deleted the subscription',
    example: 'user3',
    required: false,
  })
  @IsString()
  @IsOptional()
  deleteBy?: string;
}
