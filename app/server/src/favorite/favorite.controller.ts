import { Body, Controller, Get, Post } from '@nestjs/common';
import { favoriteService } from './favorite.service';

@Controller()
export class favoriteController {
  constructor(private readonly favoriteService: favoriteService) {}
  @Get()
  getHello( ): string {
    return 'hello'
  }
  create(){

  }
  find(){

  }
  delete(){

  }
  
}