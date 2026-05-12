import { Body, Controller, Get, Post } from '@nestjs/common';
import { workspaceService } from './workspace.service';

@Controller("workspace")
export class workspaceController {
  constructor(private readonly workspaceService: workspaceService) {}
  @Get()
  getHello( ): string {
    return 'hello'
  }
  creat(){

  }
  changeName(){

  }
  delete(){

  }
 

}