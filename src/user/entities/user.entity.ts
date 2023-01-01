import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose,{ Document} from "mongoose";

export type UserDocument = User & Document

@Schema({timestamps:true})
export class User {
  @Prop({ type: String })
  name: string;
  @Prop({ type: String, index: true })
  email: string;
  @Prop({ type: Number, required: true, unique: true })
  phone: number;
  @Prop({ type: String, required: true, index: true })
  password: string;
  @Prop({ type: String, index:true })
  sex: string;
  @Prop({ type: Boolean, default: false })
  isAgent: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
