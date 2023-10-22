import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreatePropertylistDto {
    agent: string;
    propertyImages: string[];
    propertyTitle: string;
    propertyDesc: string;
    propertyLocation: string;
    pricePerMonth: number;
    totalPackage: number;
};

export class SearchDto{
    @IsOptional()
    @IsString()
    propertyLocation:string;

    @IsOptional()
    @IsString()
    propertyType:string;

    @IsOptional()
    @IsString()
    bedrooms:number;
}
