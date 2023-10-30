import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { MongoError } from "mongodb";

@Catch(MongoError)
export class DuplicateValueExceptionFilter implements ExceptionFilter{
    catch(exception: MongoError, host: ArgumentsHost) {
       const ctx = host.switchToHttp();
       const response = ctx.getResponse<Response>();
       const status = HttpStatus.CONFLICT;

       if(exception.code === 11000) {
        response.status(status).json({
            statusCode: status,
            message: " The Email is already in use",
        });
       } else{
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        });
       }
    }
}