import { Body, Controller, Get, Post, Request, Delete, Patch, Query, Param, UseGuards } from '@nestjs/common';
import { workspaceService } from './workspace.service';
import { commonDto, findDto } from './dto/common.dto';
import { RoleWeight } from '@/common/constants';
import { roleWeight } from '@/auth/decorator/role.decorator';
import { JwtAuthGuard } from '@/auth/guard/auth.guard';
import { createTeamGuard } from '@/auth/guard/member.guard';


interface arrayData{
  teamId:number[]
}
@UseGuards(JwtAuthGuard, createTeamGuard("knowledgeBase", { exclude: ["create"] }))
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
  delete(@Request() req, @Param("id") id: string) {

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
  @Post("findAll")
  findAll(@Body() data:arrayData) {
    
    return this.workspaceService.findAll(data.teamId)
  }

}