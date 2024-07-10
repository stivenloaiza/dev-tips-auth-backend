import { PartialType } from '@nestjs/swagger';
import { CreateLogDto } from './createLogs.dto';

export class UpdateLogDto extends PartialType(CreateLogDto) {}