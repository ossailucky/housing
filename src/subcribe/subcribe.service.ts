import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateSubcribeDto, packageInfo } from './dto/create-subcribe.dto';
import { UpdateSubcribeDto } from './dto/update-subcribe.dto';
import { Subscription, SubscriptionDocument } from './entities/subcribe.entity';

@Injectable()
export class SubcribeService {
  constructor(@InjectModel(Subscription.name) private subcriptionModel: Model<SubscriptionDocument>, private userService: UserService) {}
 async create(body: CreateSubcribeDto): Promise<Subscription> {
  const data = new this.subcriptionModel({
    packageName: body.packageName,
    packagePrice: body.packagePrice,
    propertyLimit: body.propertyLimit
  });

  try {
    return data.save();
    
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<any> {
    try {
    return await this.subcriptionModel.find({});

    } catch (error) {
      throw error;
    }
  }

 async findOne(id: string): Promise<Subscription> {

  try {
    const query = await this.subcriptionModel.findById(id);

    if(query){
      return query;
    }
  } catch (error) {
    throw error;
  }
    
  }

 async update(id: string, body: UpdateSubcribeDto): Promise<boolean> {
  

  try {
    const query = await this.subcriptionModel.updateOne({_id:id}, body);
    if(query.matchedCount) return true;

    return false;

  } catch (error) {
    throw error;
  }
  
  }

 async buyPackage(id: string, userId:string, body: packageInfo){

  const startDate = new Date();
  let endDate: Date;

  switch(body.plan){
    case "monthly":
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "bi-annual":
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 6);
      break;
    case "annual":
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    default:
      throw new Error("Invalid subscription duration");
  }

  console.log(startDate);
  

  const info = {
    plan: body.plan,
    startDate: startDate,
    endDate:endDate,
    addedPropertyCount: 0,
  }
  try {



    const query = this.subcriptionModel.findOne({_id:id});
    const packageName = (await query).packageName;
    return await this.userService.subscribedPackage(userId,packageName, info);
  } catch (error) {
    throw error;
  }
  
  
 }

 async findByname(name: string): Promise<Subscription>{
  try {
    const query = await this.subcriptionModel.findOne({packageName: name});

    if(query){
      return query;
    }

    
  } catch (error) {
    throw error;
  }
  
 }
  

 async remove(id: string): Promise<boolean> {
  try {
    const query = await this.subcriptionModel.findByIdAndDelete(id);

    if(query) return true;
    
    return false;
  } catch (error) {
    throw error;
  }
  
  }
}
