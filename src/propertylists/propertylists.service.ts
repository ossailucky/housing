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
    return 'could not add property';
  }

 async findAll() {
    return await this.propertyModel.find({}).populate("agent",["email","name","phone", "profileImage"]);
  }

 async findOne(id: string) {
    return await (await this.propertyModel.findById(id)).populate("agent",["email","name","phone", "profileImage"]);
  }

 async update(id: string, updatePropertylistDto: UpdatePropertylistDto) {
  const query = await this.propertyModel.updateOne({_id:id},updatePropertylistDto);

  if(query.matchedCount > 0){
    return true
  }
    return false;
  }

 async remove(id: string): Promise<boolean> {
    const query = await this.propertyModel.findByIdAndDelete(id);
    if(query){
      return true;
    }
    return false;
  }
}
