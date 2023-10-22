import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubcribeService } from 'src/subcribe/subcribe.service';
import { Role } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreatePropertylistDto, SearchDto } from './dto/create-propertylist.dto';
import { UpdatePropertylistDto } from './dto/update-propertylist.dto';
import { PropertyDocument, Propertylist } from './entities/propertylist.entity';

@Injectable()
export class PropertylistsService {
  constructor(@InjectModel(Propertylist.name) private propertyModel: Model<PropertyDocument>, private userService:UserService, private subscribeService: SubcribeService){}
    async create(createPropertylistDto:CreatePropertylistDto): Promise<any>{

      const user = await this.userService.findData(createPropertylistDto.agent);

      const plan = await this.subscribeService.findByname(user.subcribeToPackage.toString())
      
      
      if(user.subcribeToPackage === null || user.subcribeToPackage === undefined){
        throw new HttpException("You are not subscribed to any of our plans", HttpStatus.FORBIDDEN);
      } else if(user.properties.length >= plan.propertyLimit){
        throw new HttpException("you have reach your property listing limit for your plan", HttpStatus.FORBIDDEN);

      }
      else{
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
      
  }

 async findAll() {
    return await this.propertyModel.find({}).populate("agent",["email","name","phone", "profileImage"]);
  }

 async findOne(id: string) {
    return await this.propertyModel.findById(id).populate("agent",["email","name","phone","profileImage"]).exec();
  }

 async update(id: string, updatePropertylistDto: UpdatePropertylistDto) {
  const query = await this.propertyModel.updateOne({_id:id},updatePropertylistDto);

  if(query.matchedCount > 0){
    return true
  }
    return false;
  }

 async remove(id: string, userId: string): Promise<boolean> {
    
    const user = await this.propertyModel.findById(id);
    
    const agentInfo = await this.userService.findData(userId);
    

    if( user.agent.toString() === userId.toString() || agentInfo.role === Role.ADMIN){
      const query = await this.propertyModel.findByIdAndDelete(id);
      if(query) return true;
      
    }
    return false;
    
  }

  async searchProperties(query:SearchDto): Promise<Propertylist[]>{
    const filters = {};

    if(query.propertyLocation){
      filters["propertyLocation"] = query.propertyLocation;
    }

    if(query.propertyType){
      filters["propertyType"] = query.propertyType;
    }

    if(query.bedrooms){
      filters["bedrooms"] = query.bedrooms;
    }

    try {
      return this.propertyModel.find(filters).exec();
    } catch (error) {
      return error;
    }

    
  }
}
