import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty({message: "Transaction required an agent Id"})
    agent: string;

    @IsString()
    @IsNotEmpty()
    subscription: string;

    @IsString()
    @IsNotEmpty()
    type: string;

}
