import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createDto, deleteDto, findDto, updateDto } from './dto/common.dto';

@Injectable()
export class documentService {
     constructor(private prisma: PrismaService) { }
     create(data: createDto) {
          let { title, content, kbId, teamId, userId } = data;
          return this.prisma.document.create({
               data: {
                    title,
                    kbId: +kbId,
                    teamId: +teamId,
                    content,
                    createdBy: +userId
               }
          })
     }
     delete(data: deleteDto) {
          let { id, teamId } = data;
          return this.prisma.document.delete({
               where: {
                    id: +id,
                    teamId: +teamId
               }
          })
     }
     update(data: updateDto) {
          let { id, title, status, teamId } = data;
          return this.prisma.document.update({
               where: {
                    id: +id,
                    teamId: +teamId
               },
               data: {
                    ...(title && { title }),
                    ...(status && { status })
               }
          })
     }
     find(data: findDto) {
          let { kbId, title, content, teamId } = data;
          return this.prisma.document.findMany({
               where: {
                    teamId: +teamId,
                    kbId: +kbId,
                    ...(title && {
                         title: {
                              contains: title
                         }
                    }),
                    ...(content && { content: { contains: content } })
               },
               omit: {
                    content: true, // 直接排除
               },
          })
     }
     findOne(id:number){
          return this.prisma.document.findUnique({
               where:{
                    id
               }
          })
     }

}