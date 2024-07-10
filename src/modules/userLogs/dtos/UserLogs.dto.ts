import { IsString, IsBoolean, IsDate } from 'class-validator';

export class UserLogsDto {
  @IsString()
  username: string;

  @IsString()
  system_name: string;

  @IsString()
  apiKey: string;

  @IsBoolean()
  isBlocked: boolean;

  @IsDate()
  blockedAt: Date;

  @IsDate()
  createdAt: Date;

  @IsString()
  createBy: string;

  @IsDate()
  updatedAt: Date;

  @IsString()
  updateBy: string;

  @IsDate()
  deletedAt: Date;

  @IsString()
  deleteBy: string;
}
