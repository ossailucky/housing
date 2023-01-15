import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubcribeService } from './subcribe.service';
import { CreateSubcribeDto } from './dto/create-subcribe.dto';
import { UpdateSubcribeDto } from './dto/update-subcribe.dto';

@Controller('subcribe')
export class SubcribeController {
  constructor(private readonly subcribeService: SubcribeService) {}

  @Post()
  create(@Body() createSubcribeDto: CreateSubcribeDto) {
    return this.subcribeService.create(createSubcribeDto);
  }

  @Get()
  findAll() {
    return this.subcribeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcribeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcribeDto: UpdateSubcribeDto) {
    return this.subcribeService.update(+id, updateSubcribeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcribeService.remove(+id);
  }
}
