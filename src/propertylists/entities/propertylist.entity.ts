import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

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

    @Prop({type: String})
    category: string;

    @Prop({type: String})
    type: string;

    @Prop({type: String})
    state: string;

    @Prop({type: String})
    city: string;

    @Prop({type: String})
    address: string;

    @Prop({type: Number})
    sittingRoom: number;

    @Prop({type: Number})
    pricePerMonth: number;

    @Prop({type: Number})
    totalPackage: number;

    @Prop({type: Number})
    AgentFee: number;

    @Prop({type: String})
    propertyType:string;

    @Prop({type: Number})
    bedrooms: number;

    @Prop({type: String})
    propertyAddress: string;
    
    @Prop({type: Number})
    bathrooms: number;

    @Prop({type: Number})
    tiolets: number;

}

export const PropertySchema = SchemaFactory.createForClass(Propertylist);
