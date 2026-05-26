import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service.js';
import { baseDto, commonDto, findDto,  } from './dto/common.dto.js';
import { idToNum } from '@/utils/idToNum.js';

@Injectable()
export class workspaceService {
     constructor(private readonly prisma:PrismaService){}
     create(data:commonDto){
          return this.prisma.knowledgeBase.create({
               data:{
                    teamId:+data.teamId,
                    name:data.name
               }
          })
     }
     delete(id:number){
          return this.prisma.knowledgeBase.delete({
               where:{
                    id,
                   
               }
          })
     }
     update(id:number,data:commonDto){
          return this.prisma.knowledgeBase.update({
               where:{
                    id
               },
               data:{
                    name:data.name
               }
          })
     }
     find(data:findDto){
          return this.prisma.knowledgeBase.findMany({
               where:{
                    ...idToNum({...data}),
                    ...(data.name&&{
                         name:{
                              contains:data.name
                         }
                    })
               }
          })
     }

}