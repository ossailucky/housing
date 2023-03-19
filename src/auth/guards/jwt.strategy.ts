import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport/";
import { Injectable } from "@nestjs/common";
import "dotenv/config";
import { AuthDTO } from "../dto/auth.user";
import { UserService } from "src/user/user.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(private userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: AuthDTO){
        const user = await this.userService.findData(payload._id);
        
        return { ...user};
    }
}