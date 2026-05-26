import { Body, Controller, Get, Post, UseGuards,Request, Delete, Param } from '@nestjs/common';
import { favoriteService } from './favorite.service.js';
import { JwtAuthGuard } from '@/auth/guard/auth.guard.js';
import { createDto } from './dto/common.dto.js';
@UseGuards(JwtAuthGuard)
@Controller("favorite")
export class favoriteController {
  constructor(private readonly favoriteService: favoriteService) {}
  @Post("create")
  create(@Request() req,@Body() data:createDto){
    data.userId = req.user.id;
    return this.favoriteService.create(data)
  }
  @Get()
  find(@Request() req){
    return this.favoriteService.find(+req.user.id)
  }
  @Delete(":id")
  delete(@Request() req,@Param("id") id:string){
    return this.favoriteService.delete(+id,+req.user.id)
  }
  
}