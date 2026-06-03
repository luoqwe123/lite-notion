import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { baseDto, commonDto, findDto, } from './dto/common.dto';
import { idToNum } from '@/utils/idToNum';

@Injectable()
export class workspaceService {
     constructor(private readonly prisma: PrismaService) { }
     create(data: commonDto) {
          return this.prisma.knowledgeBase.create({
               data: {
                    teamId: +data.teamId,
                    name: data.name
               }
          })
     }
     delete(id: number) {
          return this.prisma.knowledgeBase.delete({
               where: {
                    id,

               }
          })
     }
     update(id: number, data: commonDto) {
          return this.prisma.knowledgeBase.update({
               where: {
                    id
               },
               data: {
                    name: data.name
               }
          })
     }
     find(data: findDto) {
          return this.prisma.knowledgeBase.findMany({
               where: {
                    ...idToNum({ ...data }),
                    ...(data.name && {
                         name: {
                              contains: data.name
                         }
                    })
               }
          })
     }
     async findAll(teamsId:number[]) {
          // 1.数据库查询符合条件数据
          const list = await this.prisma.knowledgeBase.findMany({
               where: { teamId: { in: teamsId } }
          })
          // 2.前端/后端js分组
          const groupObj: Record<number, typeof list> = {}
          list.forEach(item => {
               if (!groupObj[item.teamId]) groupObj[item.teamId] = []
               groupObj[item.teamId].push(item)
          })
          return groupObj;
     }

}