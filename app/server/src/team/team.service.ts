import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import BaseDto from './dto/base.dto'
import CreateDto from './dto/create.dto';
import UpdateDto from './dto/update.dto';
import { Role } from '@/common/constants';
@Injectable()
export class teamService {
     constructor(private prisma: PrismaService,) { }
     async find(data: BaseDto) {
          const { id, name, description,ownerId } = data;
          return this.prisma.team.findMany({
               where: {
                    // 精确匹配 id
                    ...(id && { id:+id }),
                    ...(ownerId && { ownerId:+ownerId }),
                    // 模糊匹配 name
                    ...(name && {
                         name: { contains: name },
                    }),

                    // 模糊匹配 description
                    ...(description && {
                         description: { contains: description },
                    }),
               },
          });

     }
     async create(userId: number, data: CreateDto) {
          let team = await this.prisma.team.create({
               data: {
                    ownerId: userId,
                    ...data,
                    members: {
                         create: {
                              userId,
                              role: Role.CREATOR,
                         }
                    }
               }
          });
          return team;

     }
     async update(id: number, data: UpdateDto) {
          return this.prisma.team.update({
               where: {
                    id,
               },
               data

          })
     }
     async delete(id: number) {

          return this.prisma.team.delete({
               where: {
                    id
               }
          })
     }
     findAll() {
          return this.prisma.team.findMany()

     }

}