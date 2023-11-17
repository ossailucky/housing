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

      const currentDate = new Date().toString();
      const user = await this.userService.findData(createPropertylistDto.agent);
      //const documents = await this.userService.checkDate(currentDate);
      
      
      
      if(user.subcribeToPackage === null || user.subcribeToPackage === undefined){
        throw new HttpException("You are not subscribed to any of our plans", HttpStatus.FORBIDDEN);
      } else if(currentDate > user.subscriptionInfo[0].endDate?.toString()){
        return await this.userService.unsubscribe(createPropertylistDto.agent);
      }
       else{
          const plan = await this.subscribeService.findByname(user.subcribeToPackage.toString());

          if(user.subscriptionInfo[0].addedPropertyCount >= plan.propertyLimit){
            throw new HttpException("you have reach your property listing limit for your plan", HttpStatus.FORBIDDEN);
          }
          else{
            const property = new this.propertyModel({
              agent: createPropertylistDto.agent,
              propertyImages: createPropertylistDto.propertyImages,
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
              AgentFee: createPropertylistDto.agentFee,
              bedrooms: createPropertylistDto.bedrooms,
              bathrooms: createPropertylistDto.bathrooms,
              tiolets: createPropertylistDto.tiolets
            });
            
            try {
              const saveProperty = await property.save();

              await this.userService.saveProperty(createPropertylistDto.agent,saveProperty._id);

              return saveProperty;
            } catch (error) {
              throw error;
            }
  
          }

        

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

    if(query.category){
      filters["category"] = query.category;
    }

    if(query.type){
      filters["type"] = query.type;
    }

    if(query.bedrooms){
      filters["bedrooms"] = query.bedrooms;
    }
    if(query.city){
      filters["city"] = query.city
    }

    try {
      return this.propertyModel.find(filters).exec();
    } catch (error) {
      return error;
    }

    
  }

  async agentProperties(id: string): Promise<Propertylist[]> {
    try {
      return await this.propertyModel.find({agent:id}).populate("agent",["email","name","phone", "profileImage"]);
    } catch (error) {
      throw error;
    }
  }
}
