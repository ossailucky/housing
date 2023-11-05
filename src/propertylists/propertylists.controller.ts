import { Controller, Get, Post, Req, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, Options, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PropertylistsService } from './propertylists.service';
import { CreatePropertylistDto, SearchDto } from './dto/create-propertylist.dto';
import { UpdatePropertylistDto } from './dto/update-propertylist.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from "uuid";
import path = require("path");
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/user.entity';

const storage ={
  storage: diskStorage({
     destination: "./uploads/properties",
     filename: (req, file, cb)=>{
     const filename:string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
     const extension: string = path.parse(file.originalname).ext;

     cb(null, `${filename}${extension}`)
  }
})
}

@ApiTags("properties")
@Controller({version: "1", path: "properties"})
export class PropertylistsController {
  constructor(private readonly propertylistsService: PropertylistsService) {}

 @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor("propertyImages",20,storage))
  create( 
    @UploadedFiles() files: 
      Array<Express.Multer.File>, @Body() createPropertylistDto,@Req() { user }) {
        const agentId = user._doc._id
        
        const images = files.map((file)=>{
          return file.filename;
        });

      
        const body = {
          agent: agentId,
          propertyImages: images,
          propertyTitle: createPropertylistDto.propertyTitle,
          propertyDesc: createPropertylistDto.propertyDesc,
          propertyLocation: createPropertylistDto.propertyLocation,
          category: createPropertylistDto.category,
          type: createPropertylistDto.type,
          state: createPropertylistDto.state,
          city: createPropertylistDto.city,
          address: createPropertylistDto.address,
          sittingRoom: createPropertylistDto.sittingRoom,
          pricePerMonth: createPropertylistDto.pricePerMonth,
          totalPackage: createPropertylistDto.totalPackage,
          bedrooms: createPropertylistDto.bedrooms,
          propertyAddress: createPropertylistDto.propertyAddress,
          bathrooms: createPropertylistDto.bathrooms,
          tiolets: createPropertylistDto.tiolets
        }
      
      
    return this.propertylistsService.create(body);
  }

  @Get()
  findAll() {
    return this.propertylistsService.findAll();
  }

  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.propertylistsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('list/:id')
  update(@Param('id') id: string, @Body() updatePropertylistDto: UpdatePropertylistDto, @Req() {user}:any) {
    if(!user._doc._id ){
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
    }
    return this.propertylistsService.update(id, updatePropertylistDto,);
  }

  @hasRoles(Role.ADMIN, Role.AGENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('list/:id')
  remove(@Param('id') id: string, @Req() {user}: any) {
    return this.propertylistsService.remove(id, user._doc._id);
  }

  @Get('search')
  async search(@Query() query: SearchDto) {
    return this.propertylistsService.searchProperties(query);
  }
}
