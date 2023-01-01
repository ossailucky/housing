import { IsEmpty, IsNumber, MinLength,IsAlphanumeric,IsEmail, } from "class-validator";


export class CreateUserDto {
    @IsEmpty({message: "Name field cannot be empty"})
    firstName: string
    @IsEmail()
    @IsEmpty({message: "Email field cannot be empty"})
    email: string;
    @IsEmpty({message: "password field cannot be empty"})
    @IsAlphanumeric()
    @MinLength(8)
    password: string
}
