import { Injectable } from '@nestjs/common';


@Injectable()
export class SchedulingService {
  create() {
    return 'This action adds a new scheduling';
  }

  findAll() {
    return `This action returns all scheduling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduling`;
  }

  update(id: number) {
    return `This action updates a #${id} scheduling`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduling`;
  }
}
