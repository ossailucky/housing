import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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
    
    return dataBody.save();
  }

  async findUserData(user: AuthDTO): Promise<any>{

    return await this.userModel.findOne({email: user.email});
  }

  async findData(id:string): Promise<User>{
    return await this.userModel.findById(id);
  }

  async findAll(): Promise<any> {
    return this.userModel.find({},{password:0}).populate("properties");
  }

  async findOne(id: string): Promise<User> {
    return await (await this.userModel.findOne({ id }, {password:0})).populate("properties");
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>  {
    const query = await this.userModel.updateOne({_id: id},updateUserDto);

    if(query.matchedCount > 0) {
      return true;
    }
    return false;

  }

  async uploadProfileImage(id: string, imageName: string): Promise<boolean>{
    const query = await this.userModel.updateOne({_id: id}, {profileImage: imageName});
    
   if(query.matchedCount > 0){
    return true;
   }
   return false;
    
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async saveProperty(user_id:string, id: any): Promise<any>{
  
    return  await this.userModel.updateOne({_id:user_id}, { $push: {properties:id}})
}
}
