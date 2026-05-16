
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from "@prisma/client";
import { PrismaService } from '@/prisma/prisma.service';
import { RoleWeight,Role } from "@/common/constants"
import { Request } from 'express';

interface CustomRequest extends Request {
  user: User;
}
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,private prisma: PrismaService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    //获取用户的信息 ，其信息的来源为jwt守卫 ，其数据储存在 Request 对象中 
    const req = context.switchToHttp().getRequest<CustomRequest>(); //switchToHttp 用于切换到http服务
    const reqMethod = req.method;
    let teamId:number;
    if(reqMethod.toLowerCase() === "post"){
        teamId = req.body.id;
    }else{
        teamId = +req.params.id;
    }
    const user = req.user ;
    const methodRoles = this.reflector.get<RoleWeight>('roles', context.getHandler())
    const classRoles = this.reflector.get<RoleWeight>('roles', context.getHandler())
    const { role } = await this.prisma.teamMember.findFirst({
        where:{
            userId:user.id,
            teamId,
        }
    })
    let needWeight = Math.max(+methodRoles,+classRoles)
    return RoleWeight[role] >= needWeight;

  }
}
