import { Body, Controller, Get, Post } from '@nestjs/common';
import { teamService } from './team.service';

@Controller()
export class teamController {
  constructor(private readonly teamService: teamService) {}
  @Get()
  getHello( ): string {
    return 'hello'
  }
  create(){

  }
  delete(){

  }
  update(){

  }
  find(){
    
  }
}