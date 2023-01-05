import { PartialType } from '@nestjs/swagger';
import { CreatePropertylistDto } from './create-propertylist.dto';

export class UpdatePropertylistDto extends PartialType(CreatePropertylistDto) {}
