import { Body, Controller, Get, Post,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto, { baseDto} from './dto/login.dto';
import registerDto from './dto/register.dto';
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
  @Post("register") 
  async register(@Body() data:registerDto) {
    return this.AuthService.register(data);
  }
  @Post("gencode") 
  async gencode(@Body() data:baseDto) {
    return this.AuthService.savecode(data);
  }
} 
