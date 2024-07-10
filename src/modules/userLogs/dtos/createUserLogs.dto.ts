import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserLogsDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  system_name!: string;

  @IsNotEmpty()
  @IsString()
  apiKey!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  createBy: string;
}
