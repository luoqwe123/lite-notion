import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards,Request } from '@nestjs/common';
import { teamMemberService } from './teamMember.service';
import { findDto } from './dto/find.dto';
import { baseDto, memberDto } from './dto/common.dto';
import { JwtAuthGuard } from '@/auth/guard/auth.guard';
import { roleWeight } from '@/auth/decorator/role.decorator';
import { RoleWeight } from '@/common/constants';


@UseGuards(JwtAuthGuard)
@Controller("teamMember")
export class teamMemberController {
  constructor(private readonly teamMemberService: teamMemberService) {}
  @Get()
  find(@Request() req,@Query() data:findDto){
    data.userId = req.user.id;
    return this.teamMemberService.find(data);
  }
  @Delete()
  @roleWeight(RoleWeight.ADMIN)
  delete(@Request() req,@Query() data:baseDto){
    data.userId = req.user.id;
    return this.teamMemberService.delete(data)
  }
  
  @Patch()
  update(@Request() req,@Query() data:memberDto){
    data.userId = req.user.id;
    return this.teamMemberService.changeRole(data);
  }
  @Post("create")
  @roleWeight(RoleWeight.ADMIN)
  create(@Request() req,@Body() data:memberDto){
    data.userId = req.user.id;
    return this.teamMemberService.create(data)
  }

}