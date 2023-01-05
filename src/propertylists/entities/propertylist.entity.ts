import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/entities/user.entity";

export type PropertyDocument = Propertylist & Document

@Schema({timestamps: true})
export class Propertylist {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User", required: true})
    agent:  string;
    @Prop([{type: Array}])
    propertyImage: string[];
    @Prop({type: String})
    propertyInfo: string;
}

export const PropertySchema = SchemaFactory.createForClass(Propertylist);
