import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate{ 
    constructor( 
        private reflector: Reflector,
        private userService: UserService
        ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>("roles", context.getHandler());

        if(!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        
        const user = request.user;
        
        return roles.some((role)=> user.role?.includes(role));

    }
}