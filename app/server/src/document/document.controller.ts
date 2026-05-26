import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { documentService } from './document.service.js';
import { JwtAuthGuard } from '@/auth/guard/auth.guard.js';
import { roleWeight } from '@/auth/decorator/role.decorator.js';
import { RoleWeight } from '@/common/constants.js';
import { createDto, deleteDto, findDto, updateDto } from './dto/common.dto.js';
import { createTeamGuard } from '@/auth/guard/member.guard.js';


@UseGuards(JwtAuthGuard,createTeamGuard("document",{exclude:["create"]}))
@Controller("document")
export class documentController {
  constructor(private readonly documentService: documentService) {}

  @Post("create")
  @roleWeight(RoleWeight.EDITOR)
  create(@Body() data:createDto){
    return this.documentService.create(data)
  }

  @Get()
  find(@Query() data:findDto){
    return this.documentService.find(data)
  }
  @Patch()
  @roleWeight(RoleWeight.EDITOR)
  update(@Body() data:updateDto){
    return this.documentService.update(data)
  }
  @Delete()
  @roleWeight(RoleWeight.ADMIN)
  delete(@Query() data:deleteDto){
    return this.documentService.delete(data)
  }
  @Get(":id")
  findOne(@Param("id") id:string){
    return this.documentService.findOne(+id)
  }

}