import { IsNotEmpty } from "class-validator";


export class CreatePropertylistDto {
    agent: string[];
    propertyImages: string;
    propertyTitle: string;
    propertytDesc: string;
    propertyLocation: string;
    pricePerMonth: number;
    totalPackage: number;


}
