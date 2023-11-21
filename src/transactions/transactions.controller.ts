import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entity';

@ApiTags("transactions")
@Controller({version: "1", path: "transactions"})
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  
  //@hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.transactionsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
