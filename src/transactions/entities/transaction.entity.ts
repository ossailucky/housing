import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/entities/user.entity";

export type TransactionDocument = Transaction & Document;

@Schema({timestamps: true})
export class Transaction {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    agent: string;
    
    @Prop({type:String})
    subscription: string;

    @Prop({type:String})
    type: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
