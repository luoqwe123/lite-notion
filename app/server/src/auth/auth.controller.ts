import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post("login")
  login(@Body() data:LoginDto) {
    console.log(data)
    return this.AuthService.login();
  }
}
