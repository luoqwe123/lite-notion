import { Body, Controller, Get, Post,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post("login") 
  async login(@Body() data:LoginDto) {
    let res :any
    if(data.type === "password") {
      res = await this.AuthService.passwordLogin(data);
    }else{
      res = await this.AuthService.codeLogin(data)
    }
    return  res;
  }
  
} 
