import { PartialType } from '@nestjs/swagger';
import { CreateSubcribeDto } from './create-subcribe.dto';

export class UpdateSubcribeDto extends PartialType(CreateSubcribeDto) {}
