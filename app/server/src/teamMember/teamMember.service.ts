import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { findDto } from './dto/find.dto';
import { idToNum } from '@/utils/idToNum';
import { baseDto, memberDto } from './dto/common.dto';
import { Role } from '@/common/constants';

@Injectable()
export class teamMemberService {
    constructor(private prisma: PrismaService,) { }
    find(data: findDto) {

        return this.prisma.teamMember.findMany({
            where: idToNum({ ...data }),
            include: {
                team: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
            },
        })
    }
    delete(data: baseDto) {
        let { teamId, userId } = data;
        return this.prisma.teamMember.delete({
            where: {
                teamId_userId: {
                    teamId: +teamId,
                    userId: +userId
                }
            },
        })
    }
    changeRole(data: memberDto) {
        let { role, teamId, userId } = data;
        return this.prisma.teamMember.update({
            where: {
                teamId_userId: {
                    teamId: +teamId,
                    userId: +userId
                }
            },
            data: {
                role: Role[role.toUpperCase()]
            }
        })
    }
    create(data: memberDto) {
        let { role, teamId, userId } = data;
        return this.prisma.teamMember.create({
            data: {
                role: Role[role.toUpperCase()],
                teamId: +teamId,
                userId: +userId
            }
        })
    }
}
