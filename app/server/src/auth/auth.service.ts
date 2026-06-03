import { PrismaService } from '@/prisma/prisma.service';
import type { User } from '@prisma/client';
import { Injectable, BadRequestException, Res } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt"
import LoginDto, { baseDto } from './dto/login.dto';
import { verify } from 'argon2';
import { sendMail } from '@/utils/sendMail';
import registerDto from './dto/register.dto';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
  async passwordLogin(data: LoginDto, res: Response) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email
        }
      })

      if (user?.password! != data.password) {
        throw new BadRequestException('密码输入错误')
      }
      return this.token(user!, res)
    } catch (error) {
      throw new BadRequestException(error)
    }

  }
  async savecode(data: baseDto) {
    let { email } = data;
    let random = Math.random().toString().slice(-6);
    await this.prisma.verifyCode.create({
      data: {
        email,
        code: random,
        expiresAt: new Date(Date.now() + 3 * 60 * 1000),
      },
    })

    sendMail(email, random);
    return {
      message: "success"
    }
  }

  async codeLogin(data: LoginDto, res: Response) {
    let { email, verifycode } = data;
    let isture = await this.checkCode(email, verifycode);
    if (isture) {
      let user = await this.prisma.user.findFirst({
        where: {
          email,
        }
      })
      return this.token(user, res)
    }
  }
  async token(user: User, res: Response) {
    try {
      let { email, id, avatar, nickname } = user;
      let token = await this.jwt.signAsync({
        email,
        id,

      });
      // 2. 直接写入 Cookie（核心！）
      res.cookie('token', token, {
        httpOnly: true, // 🔥 JS 永远拿不到，防 XSS
        secure: process.env.NODE_ENV === 'production', // 生产环境 HTTPS
        sameSite: 'strict', // 🔥 防 CSRF
        maxAge: this.config.get("TOKEN_EXPIRES_IN") * 24 * 60 * 60 * 1000, // 3天过期
        path: '/',
      });
      return {
        email,
        avatar,
        username: nickname,
        message: "success"
      }
    } catch (error) {
      throw new BadRequestException(error)
    }

  }
  async checkCode(email: string, verifycode: string) {
    let code = await this.prisma.verifyCode.findFirst({
      where: {
        email,
        used: false,
        code: verifycode,
        expiresAt: {
          gt: new Date() // 过期时间 > 当前时间（没过期）
        }
      },
      orderBy: {
        createdAt: 'desc' // 取最新的一条（最稳妥）
      }
    })

    if (!code) {
      throw new BadRequestException("验证码失效或错误")
    } else {
      // 验证通过后，标记为已使用
      await this.prisma.verifyCode.update({
        where: { id: code.id },
        data: { used: true }
      });
      return true;
    }
  }
  async register(data: registerDto, res: Response) {
    let { email, verifycode, password } = data;
    let nickname = process.env["USER_NAME"];

    const userData = { email, password, nickname }
    let isture = await this.checkCode(email, verifycode);
    if (isture) {
      let user = await this.prisma.user.findFirst({
        where: {
          email
        }
      })
      if (!user) {
        user = await this.prisma.user.create({
          data: userData
        })
      }

      return this.token(user, res);
    }

  }
}
