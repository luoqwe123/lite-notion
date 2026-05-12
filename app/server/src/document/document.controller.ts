import { Body, Controller, Get, Post } from '@nestjs/common';
import { documentService } from './document.service';

@Controller()
export class documentController {
  constructor(private readonly documentService: documentService) {}
  @Get()
  getHello( ): string {
    return 'hello'
  }
  create(){

  }
  find(){

  }
  update(){

  }
  delete(){
    
  }

}