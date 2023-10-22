import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/entities/user.entity";

export type PropertyDocument = Propertylist & Document

@Schema({timestamps: true})
export class Propertylist {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User", required: true})
    agent:  string;

    @Prop([{type: Array}])
    propertyImages: string[];

    @Prop({type: String})
    propertyTitle: string;

    @Prop({type: String})
    propertyDesc: string;

    @Prop({type: String})
    propertyLocation: string;

    @Prop({type: Number})
    pricePerMonth: number;

    @Prop({type: Number})
    totalPackage: number;

    @Prop({type: String})
    propertyType:string;

    @Prop({type: Number})
    bedrooms: number;

}

export const PropertySchema = SchemaFactory.createForClass(Propertylist);
