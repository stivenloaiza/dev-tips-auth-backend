import {
  IsString,
  IsBoolean,
  IsDate,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  system_name: string;

  @IsOptional()
  @IsDate()
  expiration?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

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

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  lastUsedAt?: Date | null;

  @IsOptional()
  @IsNumber()
  maxUsage?: number | null;

  @IsOptional()
  @IsNumber()
  usageCount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedIps?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];
}
