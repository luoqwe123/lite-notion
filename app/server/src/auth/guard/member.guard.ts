// team.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service.js';

@Injectable()
class TeamGuard implements CanActivate {
    constructor(
        private prisma: PrismaService,
        private tableName: string, // 你要校验的表
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        if (req.url.includes("create")) {
            return true
        }
        const userId = +req.user.id; // 来自 JWT
        const reqMethod = req.method;
        let teamId: number;
        let id: number;
        if (reqMethod.toLowerCase() === "post") {
            teamId = +req.body.teamId;
            id = +req.body.id;
        } else {
            id = +req.body.id;
            teamId = +req.params.teamId;
        }

        if (!teamId) return false;
        // 根据不同表，查询用户是否在团队
        let hasPermission: any;
        if (this.tableName === 'document') {
            hasPermission = await this.prisma.document.findFirst({
                where: {
                    id,
                    kb: {
                        teamId,
                        team: {
                            members: {
                                some: {
                                    userId
                                }
                            }
                        }
                    }
                }
            });
        } else {
            hasPermission = await this.prisma[this.tableName].findFirst({
                where: {
                    id, teamId,
                    team: {
                        members: {
                            some: {
                                userId
                            }
                        }
                    }
                },

            });
        }



        return hasPermission;
    }
}
// team.guard.ts
interface optionsType {
    exclude: string[],

}
export const createTeamGuard = (tableName: string, options?: optionsType) => {
    return class {
        canActivate(context: ExecutionContext) {
            const req = context.switchToHttp().getRequest();
            let { exclude } = options;
            for (const el of exclude) {
                if (req.url.includes(el)) {
                    return true
                }
            }

            const guard = new TeamGuard(new PrismaService(), tableName);
            return guard.canActivate(context);
        }
    };
};