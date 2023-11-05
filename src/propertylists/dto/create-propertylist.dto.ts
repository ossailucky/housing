import { IsNotEmpty, IsOptional, IsString, IsNumber} from "class-validator";


export class CreatePropertylistDto {
    agent: string;

    propertyImages: string[];

    @IsNumber()
    propertyTitle: string;

    @IsString()
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

    @IsString()
    sittingRoom: number;

    @IsNumber()
    pricePerMonth: number;

    @IsNumber()
    totalPackage: number;

    @IsNumber()
    agentFee: number;


    @IsNumber()
    bedrooms: number;


    @IsOptional()
    @IsNumber()
    bathrooms: string;

    @IsOptional()
    @IsNumber()
    tiolets: string;


};

export class SearchDto{
    @IsOptional()
    @IsString()
    propertyLocation:string;

    @IsOptional()
    @IsString()
    propertyType:string;

    @IsOptional()
    @IsNumber()
    bedrooms:number;
}
