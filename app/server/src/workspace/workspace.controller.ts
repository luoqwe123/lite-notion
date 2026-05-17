import { Body, Controller, Get, Post, Request,Delete ,Patch,Query,Param} from '@nestjs/common';
import { workspaceService } from './workspace.service';
import { commonDto, findDto } from './dto/common.dto';
import { RoleWeight } from '@/common/constants';
import { roleWeight } from '@/auth/decorator/role.decorator';

@Controller("workspace")
export class workspaceController {
  constructor(private readonly workspaceService: workspaceService) { }

  @Post("create")
  @roleWeight(RoleWeight.EDITOR)
  create(@Request() req, @Body() data: commonDto) {
    data.userId = req.user.id;
    return this.workspaceService.create(data);
  }

  @Delete(":id")
  @roleWeight(RoleWeight.ADMIN)
  delete(@Request() req,@Param("id") id: string) {
    let  userId = req.user.id;
    return this.workspaceService.delete(+id,+userId);
  }
  @Patch(":id")
  @roleWeight(RoleWeight.ADMIN)
  update(@Param("id") id: string, @Body() data: commonDto) {
    return this.workspaceService.update(+id, data);
  }
  @Get()
  find(@Query() data: findDto) {
    return this.workspaceService.find(data)
  }


}