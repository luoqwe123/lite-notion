import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service.js';
import { findDto } from './dto/find.dto.js';
import { idToNum } from '@/utils/idToNum.js';
import { baseDto, memberDto } from './dto/common.dto.js';
import { Role } from '@/common/constants.js';

@Injectable()
export class teamMemberService {
    constructor(private prisma: PrismaService,) { }
    find(data: findDto) {
        return this.prisma.teamMember.findMany({
            where: idToNum({ ...data })
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
