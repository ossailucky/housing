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

    @IsNumber()
    pricePerMonth: number;

    @IsNumber()
    totalPackage: number;

    @IsNumber()
    bedrooms: number;

    @IsString()
    propertyAddress: string;

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
