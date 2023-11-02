import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import path = require("path");
import { v4 as uuidv4} from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from './entities/user.entity';


const storage = {
  storage: diskStorage({
    destination: "./uploads/profileimages",
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
  ProfileIamge(@UploadedFile() file, @Req() {user}){
    if(!user._doc._id){
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    
    return this.userService.uploadProfileImage(user._doc._id, file.filename)
  }

  @Get("profileimage/:imagename")
  findPfrofileImage(@Param("imagename") imagename, @Res() res){
    return res.sendFile(join(process.cwd(), "./uploads/profileimages/" + imagename));
  }

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  
  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Patch("make-admin/:id")
  makeAdmin(@Param("id") id:string){
    return this.userService.updateRole(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto,@Req() { user }: any) {
    if(!user._doc._id){
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.userService.update(user._doc._id, updateUserDto);
  }

  @Delete(':id')
  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string, @Req() { user }: any) {
    return this.userService.remove(id);
  }
}
