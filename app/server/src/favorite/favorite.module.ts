import { Module } from '@nestjs/common';
import { favoriteController } from './favorite.controller.js';
import { favoriteService } from './favorite.service.js';

@Module({
  imports: [],
  controllers: [favoriteController],
  providers: [favoriteService],
})
export class favoriteModule {}