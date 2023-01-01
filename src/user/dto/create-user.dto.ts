import { IsNotEmpty, IsNumber, MinLength,IsAlphanumeric,IsEmail, } from "class-validator";


export class CreateUserDto {
    @IsNotEmpty({message: "Name field cannot be empty"})
    name: string;
    @IsEmail()
    @IsNotEmpty({message: "Email field cannot be empty"})
    email: string;
    @IsNotEmpty({message: "password field cannot be empty"})
    @IsAlphanumeric()
    @MinLength(8)
    password: string;
}
