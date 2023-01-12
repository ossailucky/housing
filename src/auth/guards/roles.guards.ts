import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{ 
    constructor( 
        private reflector: Reflector,
        private userService: UserService
        ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

        if(!roles){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        
        
        return roles.some((role)=> user._doc.role?.includes(role));

    }
}