import { Body, Controller, Get, Post, UseGuards,Request, Param, Query, Delete, Patch} from '@nestjs/common';
import { teamService } from './team.service';
import BaseDto from './dto/base.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import CreateDto from './dto/create.dto';
import { roleWeight } from '@/auth/decorator/role.decorator';
import { Role, RoleWeight } from '@/common/constants';
import UpdateDto from './dto/update.dto';

@UseGuards(AuthGuard)
@Controller("team")
export class teamController {
  constructor(private readonly teamService: teamService) {}

  
  @Post("create")
  create(@Request() req,data:CreateDto){
    let user = req.user;
    return this.teamService.create(user.id,data);
  }
  
  @Delete(":id")
  @roleWeight(RoleWeight.CREATOR)
  delete(@Param("id") id:string){
    return this.teamService.delete(+id);
  }
  @Patch(":id")
  @roleWeight(RoleWeight.CREATOR)
  update(@Param("id") id:string,data:UpdateDto){
    return this.teamService.update(+id,data);
  }
  @Get()
  find(@Query() data:BaseDto){
    return this.teamService.find(data)
  }
  @Get("findAll")
  findAll(){
    return this.teamService.findAll();
  }

}