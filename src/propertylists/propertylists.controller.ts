import { Controller, Get, Post, Req, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, Options } from '@nestjs/common';
import { PropertylistsService } from './propertylists.service';
import { CreatePropertylistDto } from './dto/create-propertylist.dto';
import { UpdatePropertylistDto } from './dto/update-propertylist.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4} from "uuid";
import path = require("path");

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

@ApiTags("listproperty")
@Controller({version: "1", path: "listproperty"})
export class PropertylistsController {
  constructor(private readonly propertylistsService: PropertylistsService) {}

 @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor("propertyImages",20,storage))

  create( 
    @UploadedFiles() files: {
      propertyImages:Array<Express.Multer.File>,}, @Body() createPropertylistDto,@Req() req) {
      
        const body = {
          agent: req.user._id,
          propertyImages: [files[0].filename,files[1].filename],
          propertyTitle: createPropertylistDto.propertyTitle,
          propertyDesc: createPropertylistDto.propertyDesc,
          propertyLocation: createPropertylistDto.propertyLocation,
          pricePerMonth: createPropertylistDto.pricePerMonth,
          totalPackage: createPropertylistDto.totalPackage
        }
      
      
    return this.propertylistsService.create(body);
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
