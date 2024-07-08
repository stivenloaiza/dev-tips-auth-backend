import {
    IsString,
    IsNumber,
    IsDate,
    IsOptional,
    IsObject,
  } from 'class-validator';
  
  export class CreateLogDto {
    @IsString()
    ip: string;
  
    @IsString()
    userId: string;
  
    @IsString()
    endpoint: string;
  
    @IsString()
    system_name: string;
  
    @IsString()
    method: string;
  
    @IsObject()
    requestBody: any;
  
    @IsObject()
    responseBody: any;
  
    @IsNumber()
    statusCode: number;
  
    @IsDate()
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