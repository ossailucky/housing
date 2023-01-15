import { IsNotEmpty, IsNumber,IsString} from "class-validator";

export class CreateSubcribeDto {
    @IsNotEmpty({message: "package name cannot be empty"})
    @IsString({message: "pacakage name must be a string"})
    packageName: string;
    @IsNotEmpty({message: "package price cannot be empty"})
    @IsNumber()
    packagePrice: number;
    @IsNotEmpty({message: "property limit cannot be empty"})
    @IsNumber()
    propertyLimit: number;
}
