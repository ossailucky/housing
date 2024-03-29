import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubcribeService } from './subcribe.service';
import { CreateSubcribeDto, packageInfo } from './dto/create-subcribe.dto';
import { UpdateSubcribeDto } from './dto/update-subcribe.dto';
import { ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entity';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';


@ApiTags("subscriptions")
@Controller({version: "1", path: "subscriptions"})
export class SubcribeController {
  constructor(private readonly subcribeService: SubcribeService) {}

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
    return this.subcribeService.findOne(id);
  }

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubcribeDto: UpdateSubcribeDto) {
    return this.subcribeService.update(id, updateSubcribeDto);
  }

  @hasRoles(Role.AGENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("buypackage/:id")
  buyPackage(@Param("id") id: string, @Body() body: packageInfo, @Req() { user }: any){
    
    return this.subcribeService.buyPackage(id, user._doc._id, body);

  }

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcribeService.remove(id);
  }
}
