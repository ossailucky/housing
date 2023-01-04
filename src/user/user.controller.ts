import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import path = require("path");
import { v4 as uuidv4} from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';


const storage = {
  storage: diskStorage({
    destination: "./uploads/profileImages",
    filename: (req,file,cb)=>{
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    }
  })
}

@ApiTags("users")
@Controller({version: "1", path: "users"})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/profileimage")
  @UseInterceptors(FileInterceptor("image", storage))
  ProfileIamge(@UploadedFile() file, @Req() req){
    if(!req.user._id){
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    
    return this.userService.uploadProfileImage(req.user._id, file.filename)
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto,@Req() req) {
    if(!req.user._id){
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.userService.update(req.user._id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
