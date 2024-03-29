import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model} from 'mongoose';
import { AuthDTO } from 'src/auth/dto/auth.user';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(body: CreateUserDto): Promise<User> {
    const hashPassword : string = await bcrypt.hash(body.password,10);
    const dataBody = new this.userModel({
      name: body.name,
      email: body.email,
      password: hashPassword,
    });

    try {

      return dataBody.save();

    } catch (error) {

      throw error;
    }
    
    
  }

  async findUserData(user: AuthDTO): Promise<any>{

    try {
      const userFound = await this.userModel.findOne({email: user.email});

      if(!userFound){
        return "user not foumd";
      }

      return userFound;
    } catch (error) {
      
      throw error;
    }

   
    
  }

  async findData(id:string): Promise<User>{
    
    try {
      const user = await this.userModel.findById(id);

      if(!user){
        return null;
      }

      return user;
    } catch (error) {
      throw error
    }
  }

  async findAll(): Promise<any> {
    

    try {
      const users = await this.userModel.find({},{password:0}).populate("properties");

      return users
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ id }, {password:0}).populate("properties");
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>  {

    try {
    const query = await this.userModel.updateOne({_id: id},updateUserDto);
    
    if(query.matchedCount > 0) {
      return true;
    }
    return false;
    } catch (error) {
      throw error;
    }
    

  }

  async updateRole(id: string): Promise<String> {
    try {
      const query = await this.userModel.updateOne({_id:id}, {role: "admin"});

      if(query.matchedCount > 0 ){
        return "User is now an Admin";
      }
    } catch (error) {
      throw error;
    }
  }

  async uploadProfileImage(id: string, imageName: string): Promise<boolean>{
    
    try {
    const query = await this.userModel.updateOne({_id: id}, {profileImage: imageName});
    if(query.matchedCount > 0){
      return true;
     }
     return false;
    } catch (error) {
      throw error;
    }
   
    
  }

  async subscribedPackage(id: string, packageName: string, subscriptionInfo: {} ): Promise<string>{
    const query = await this.userModel.updateOne({_id:id}, {subcribeToPackage: packageName, subscriptionInfo:subscriptionInfo});
    
    try {
      if(!query) return "subscription failed";

      return "subscription successfull";
    } catch (error) {
      throw error;
    }
   

    
  }

  async unsubscribe(id: string): Promise<string>{
    const query = await this.userModel.updateOne({_id:id}, {subcribeToPackage: null, subscriptionInfo:[]});
    
    try {
      if(query) return "subscription expired";

    } catch (error) {
      throw error;
    }
   

    
  }

 async remove(id: string): Promise<boolean> {


  try {
  const query = await this.userModel.findByIdAndDelete(id);
  if(!query){
    return false;
  }
  return true;
  } catch (error) {
    throw error;
  }
  
}


  async saveProperty(user_id:string, id: any): Promise<any>{
  

    try {
    return  await this.userModel.updateOne({_id:user_id}, { $push: {properties:id},  $inc: { "subscriptionInfo.0.addedPropertyCount": 1 } }).exec();
      
    } catch (error) {
      throw error;
    }
}

async checkDay() {
  try {
    const currentDay = new Date().getDate();
    const users = await this.userModel.updateMany({
      $expr:{
          $eq: [{$dayOfMonth: {$arrayElemAt:['$subscriptionInfo.endDate',0]}}, currentDay],         
  
      }
    },
    {
      $set: { 'subscriptionInfo.0.addedPropertyCount': 0 },
    }
    ).exec();
    
    return users
  } catch (error) {
    console.error('Error in getUsersWithSubscriptionEndingToday:', error.message);
      throw error;
  }
  

  
  
  
  }
}
