import { IsNotEmpty, IsOptional, IsString, IsNumber} from "class-validator";


export class CreatePropertylistDto {
    agent: string;

    propertyImages: string[];

    @IsNumber()
    propertyTitle: string;

    @IsString({message:"field must be a string"})
    propertyDesc: string;

    @IsString()
    propertyLocation: string;

    @IsString()
    category: string;

    @IsString()
    type: string;

    @IsString()
    state: string;

    @IsString()
    city: string;

    @IsString()
    address: string;

    @IsNumber({},{ message: 'Custom error message: This field must be a number' })
    sittingRoom: number;

    @IsNumber({},{ message: 'Custom error message: This field must be a number' })
    pricePerMonth: number;

    @IsNumber({},{ message: 'Custom error message: This field must be a number' })
    totalPackage: number;

    @IsNumber({},{ message: 'Custom error message: This field must be a number' })
    agentFee: number;


    @IsNumber({},{ message: 'Custom error message: This field must be a number' })
    bedrooms: number;


    @IsOptional()
    @IsNumber({},{ message: 'Custom error message: This field must be a number' })
    bathrooms: number;

    @IsOptional()
    @IsNumber({},{ message: 'Custom error message: This field must be a number' })
    tiolets: number;


};

export class SearchDto{
    @IsOptional()
    @IsString()
    propertyLocation:string;

    @IsOptional()
    @IsString()
    category:string;

    @IsOptional()
    @IsString()
    type:string;

    @IsOptional()
    @IsNumber()
    bedrooms:number;

    @IsOptional()
    @IsString()
    city:string;
}
