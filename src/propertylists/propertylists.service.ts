import { Injectable } from '@nestjs/common';
import { CreatePropertylistDto } from './dto/create-propertylist.dto';
import { UpdatePropertylistDto } from './dto/update-propertylist.dto';

@Injectable()
export class PropertylistsService {
  create(createPropertylistDto: CreatePropertylistDto) {
    return 'This action adds a new propertylist';
  }

  findAll() {
    return `This action returns all propertylists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertylist`;
  }

  update(id: number, updatePropertylistDto: UpdatePropertylistDto) {
    return `This action updates a #${id} propertylist`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertylist`;
  }
}
