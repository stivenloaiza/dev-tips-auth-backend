import { PartialType } from '@nestjs/swagger';
import { CreateUserLogsDto } from './createUserLogs.dto';

export class UpdateUserDto extends PartialType(CreateUserLogsDto) {}
