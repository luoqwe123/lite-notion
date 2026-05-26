import { Body, Controller, Get, Post, Request,Delete ,Patch,Query,Param, UseGuards} from '@nestjs/common';
import { workspaceService } from './workspace.service.js';
import { commonDto, findDto } from './dto/common.dto.js';
import { RoleWeight } from '@/common/constants.js';
import { roleWeight } from '@/auth/decorator/role.decorator.js';
import { JwtAuthGuard } from '@/auth/guard/auth.guard.js';
import { createTeamGuard } from '@/auth/guard/member.guard.js';

@UseGuards(JwtAuthGuard,createTeamGuard("knowledgeBase",{exclude:["create"]}))
@Controller("workspace")
export class workspaceController {
  constructor(private readonly workspaceService: workspaceService) { }

  @Post("create")
  @roleWeight(RoleWeight.EDITOR)
  create(@Request() req, @Body() data: commonDto) {
    data.userId = req.user.id;
    return this.workspaceService.create(data);
  }

  @Delete(":teamid/:id")
  @roleWeight(RoleWeight.ADMIN)
  delete(@Request() req,@Param("id") id: string) {
    
    return this.workspaceService.delete(+id);
  }
  @Patch(":teamid/:id")
  @roleWeight(RoleWeight.ADMIN)
  update(@Param("id") id: string, @Body() data: commonDto) {
    return this.workspaceService.update(+id, data);
  }
  @Get()
  find(@Query() data: findDto) {
    return this.workspaceService.find(data)
  }


}