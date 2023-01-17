import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose,{ Document} from "mongoose";
import { Propertylist } from "src/propertylists/entities/propertylist.entity";

export type UserDocument = User & Document;

export enum Role {
  ADMIN = "admin",
  AGENT = "agent"
}

@Schema({timestamps:true})
export class User {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true, index: true, unique: true})
  email: string;
  @Prop({ type: Number})
  phone: number;
  @Prop({ type: String, required: true, index: true })
  password: string;
  @Prop({ type: String, index:true })
  sex: string;
  @Prop({ type: String})
  subcribeToPackage: boolean;
  @Prop({type: String})
  profileImage: string;
  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "Propertylist"}])
   properties: Propertylist[];
  @Prop({type: String, enum: Role, default: Role.AGENT})
  role:Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
