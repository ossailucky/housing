import { IsNotEmpty } from "class-validator";


export class CreatePropertylistDto {
    agent: string;
    propertyPicture: string;
    propertytInfo: string;
    pricePerMonth: number;
    totalPackage: number;


}
