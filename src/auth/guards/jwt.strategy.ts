import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport/";
import { Injectable } from "@nestjs/common";
import "dotenv/config";
import { AuthDTO } from "../dto/auth.user";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: AuthDTO){
        return { ...payload};
    }
}