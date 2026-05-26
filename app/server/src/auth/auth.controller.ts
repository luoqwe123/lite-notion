import { Body, Controller, Get, Post,HttpCode,Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import LoginDto, { baseDto} from './dto/login.dto.js';
import registerDto from './dto/register.dto.js';
import { Response } from 'express';
@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post("login") 
  async login(@Body() data:LoginDto,@Res() res) {
    
    if(data.type === "password") {
      return await this.AuthService.passwordLogin(data,res);
    }else{
      return await this.AuthService.codeLogin(data,res)
    }
   
  }
  @Post("register") 
  async register(@Body() data:registerDto,@Res() res) {
    return this.AuthService.register(data,res);
  }
  @Post("gencode") 
  async gencode(@Body() data:baseDto) {
    return this.AuthService.savecode(data);
  }
} 
