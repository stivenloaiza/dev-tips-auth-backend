import {
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserLogsDto {
  @ApiProperty({
    description: 'Username associated with the user logs',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Name of the system associated with the user logs',
    example: 'MySystem',
  })
  @IsString()
  system_name: string;

  @ApiProperty({
    description: 'API Key associated with the user logs',
    example: 'abc123def456',
  })
  @IsString()
  apiKey: string;

  @ApiProperty({
    description: 'Number of requests associated with the user logs',
    required: false,
    type: Number,
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  requestCount?: number;

  @ApiProperty({
    description: 'Indicates if the user is blocked',
    required: false,
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;

  @ApiProperty({
    description: 'Date and time when the user was blocked',
    required: false,
    type: Date,
    example: '2024-07-10T12:00:00Z',
  })
  @IsOptional()
  @IsDate()
  blockedAt?: Date;

  @ApiProperty({
    description: 'Date and time when the user logs were created',
    required: false,
    type: Date,
    example: '2024-07-10T10:00:00Z',
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date | null;

  @ApiProperty({
    description: 'Username of the creator of the user logs',
    required: false,
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  createBy?: string;

  @ApiProperty({
    description: 'Date and time when the user logs were last updated',
    required: false,
    type: Date,
    example: '2024-07-10T11:30:00Z',
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;

  @ApiProperty({
    description: 'Username of the user who last updated the user logs',
    required: false,
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @ApiProperty({
    description: 'Date and time when the user logs were deleted',
    required: false,
    type: Date,
    example: '2024-07-10T15:00:00Z',
  })
  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  @ApiProperty({
    description: 'Username of the user who deleted the user logs',
    required: false,
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  deleteBy?: string;
}
