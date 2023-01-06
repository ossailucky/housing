import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreatePropertylistDto } from './dto/create-propertylist.dto';
import { UpdatePropertylistDto } from './dto/update-propertylist.dto';
import { PropertyDocument, Propertylist } from './entities/propertylist.entity';

@Injectable()
export class PropertylistsService {
  constructor(@InjectModel(Propertylist.name) private propertyModel: Model<PropertyDocument>, private userService:UserService){}
    async create(createPropertylistDto:CreatePropertylistDto): Promise<any>{
      const property = new this.propertyModel({
        agent: createPropertylistDto.agent,
        propertyImages: createPropertylistDto.propertyImages,
        propertyTitle: createPropertylistDto.propertyTitle,
        propertyDesc: createPropertylistDto.propertyDesc,
        propertyLocation: createPropertylistDto.propertyLocation,
        pricePerMonth: createPropertylistDto.pricePerMonth,
        totalPackage: createPropertylistDto.totalPackage,
      })
      if(property){
        const saveProperty = await property.save();
        await this.userService.saveProperty(createPropertylistDto.agent,saveProperty._id);
        return saveProperty;
      }
    return 'This action adds a new propertylist';
  }

  findAll() {
    return `This action returns all propertylists`;
  }

 async findOne(id: string) {
    return await (await this.propertyModel.findById(id)).populate("agent",["email","name","phone", "profileImage"]);
  }

  update(id: number, updatePropertylistDto: UpdatePropertylistDto) {
    return `This action updates a #${id} propertylist`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertylist`;
  }
}
