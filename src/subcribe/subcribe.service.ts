import { Injectable } from '@nestjs/common';
import { CreateSubcribeDto } from './dto/create-subcribe.dto';
import { UpdateSubcribeDto } from './dto/update-subcribe.dto';

@Injectable()
export class SubcribeService {
  create(createSubcribeDto: CreateSubcribeDto) {
    return 'This action adds a new subcribe';
  }

  findAll() {
    return `This action returns all subcribe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subcribe`;
  }

  update(id: number, updateSubcribeDto: UpdateSubcribeDto) {
    return `This action updates a #${id} subcribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} subcribe`;
  }
}
