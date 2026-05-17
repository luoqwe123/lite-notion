import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { createDto } from './dto/common.dto';

@Injectable()
export class favoriteService {
     constructor(private prisma: PrismaService,) { }
     create(data: createDto) {
          return this.prisma.favorite.create({
               data: {
                    userId: +data.userId,
                    documentId: +data.documentId,
                    tag: data.tag
               }
          })
     }
     delete(id:number,userId:number) {
          return this.prisma.favorite.delete({
               where:{
                    id,
                    userId
               }
          })
     }

     find(userId:number) {
          return this.prisma.favorite.findMany({
               where:{
                    userId
               }
          })
     }
}