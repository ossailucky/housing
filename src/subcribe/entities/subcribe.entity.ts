import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/entities/user.entity";
export type SubscriptionDocument = Subscription & Document

@Schema()
export class Subscription {
    @Prop({type: String})
    packageName: string;
    @Prop({type: Number})
    packagePrice: number;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    subcribers: User[];
    @Prop({type: Number})
    propertyLimit: number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
