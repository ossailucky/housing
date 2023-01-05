import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertylistsService } from './propertylists.service';
import { CreatePropertylistDto } from './dto/create-propertylist.dto';
import { UpdatePropertylistDto } from './dto/update-propertylist.dto';

@Controller('propertylists')
export class PropertylistsController {
  constructor(private readonly propertylistsService: PropertylistsService) {}

  @Post()
  create(@Body() createPropertylistDto: CreatePropertylistDto) {
    return this.propertylistsService.create(createPropertylistDto);
  }

  @Get()
  findAll() {
    return this.propertylistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertylistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertylistDto: UpdatePropertylistDto) {
    return this.propertylistsService.update(+id, updatePropertylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertylistsService.remove(+id);
  }
}
