import { IsOptional, IsString } from 'class-validator';

export class UpdateUserLogsDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  system_name?: string;

  @IsOptional()
  @IsString()
  apiKey?: string;

  @IsOptional()
  @IsString()
  updateBy?: string;
}
