import { PrismaService } from '@/prisma/prisma.service';
import type { User } from '@prisma/client';
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt"
import LoginDto, { baseDto } from './dto/login.dto';
import { verify } from 'argon2';
import { sendMail } from '@/utils/sendMail';
import registerDto from './dto/register.dto';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }
  async passwordLogin(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (!(await verify(user?.password!, data.password))) {
      throw new BadRequestException('密码输入错误')
    }
    return this.token(user!)
  }
  async savecode(data: baseDto) {
    let { email, type } = data;
    let random = Math.random().toString().slice(-6);
    await this.prisma.verifyCode.create({
      data: {
        email,
        code: random,
        expiresAt: new Date(Date.now() + 1 * 60 * 1000).toUTCString(),
      },
    })
    sendMail(email, type, random);
    return {
      message: "success"
    }
  }

  async codeLogin(data: LoginDto) {
    let { email, verifycode } = data;
    let isture = await this.checkCode(email,verifycode);
    if(isture) {
      let user = await this.prisma.user.findFirst({
        where: {
          email,
        }
      })
      return this.token(user)
    }
  }
  async token(user: User) {
    let { email, id, avatar, nickname } = user;
    return {
      token: await this.jwt.signAsync({
        email,
        id,

      }),
      avatar,
      username: nickname,
      message: "success"
    }
  }
  async checkCode(email:string, verifycode:string){
    let code = await this.prisma.verifyCode.findFirst({
      where: {
        email,
        used: false
      }
    })
    if (+code.expiresAt - Date.now() < 0) {
      throw new BadRequestException("验证码失效")
    } else if (code.code != verifycode) {
      throw new BadRequestException("验证码错误")
    }else{
      return true;
    }
  }
  async register(data:registerDto){
    let { email, verifycode } = data;
    let  nickname = process.env["USER_NAME"];
    const  userData = {...data,nickname}
    let isture = await this.checkCode(email,verifycode);
    if(isture){
      let user =  await this.prisma.user.create({
        data:userData
      })
      return this.token(user);
    }
    
  }
}
