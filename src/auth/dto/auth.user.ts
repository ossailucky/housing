import { IsNotEmpty,IsEmail,MinLength, isEmail } from "class-validator";

export class AuthDTO {
    _id: string;
    @IsEmail()
    @IsNotEmpty({message: " Email field cannot be empty"})
    email: string;
    @MinLength(8)
    @IsNotEmpty({message: "password field cannot be empty"})
    password: string;
    role: string;
}

export class AuthorizeDTO{
    @IsNotEmpty()
    _id: string;
    @IsNotEmpty({message: " Email field cannot be empty"})
    email: string;
    
}