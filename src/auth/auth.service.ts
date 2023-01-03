import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UserService } from 'src/user/user.service';
import { AuthDTO,AuthorizeDTO } from './dto/auth.user';
@Injectable({})
export class AuthService {
    constructor( 
        private userService: UserService,
        private jwtService: JwtService,
        ) {}
    
    async validate(authDto: AuthDTO): Promise<any>{
        const user = await this.userService.findUserData(authDto);
        if(!user){
            throw new HttpException("Not a User", HttpStatus.UNAUTHORIZED);
        }

        const match = await bcrypt.compare(authDto.password, user.password);

        if(match){
            const accessToken = await this.isAuthenticate({
                _id: user._id
            });
        
            const account = await this.userService.findOne(user._id);

            return{
                account,
                ...accessToken
            }

        }else {
      throw new HttpException('invalid details', HttpStatus.UNAUTHORIZED);
    }
    }

    async isAuthenticate(user: AuthorizeDTO){
        return{
            access_token: this.jwtService.sign(user)
        }
    }

   
}
