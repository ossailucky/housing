import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.user';

@Controller({path:'auth', version: "1"})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Res() res: Response, @Body() authDto: AuthDTO){
    const { account, access_token } = await this.authService.validate(authDto);

    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.json({ account, access_token });
    return account
  }
    
}
