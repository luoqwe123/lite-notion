import { Module } from '@nestjs/common';
import { favoriteController } from './favorite.controller';
import { favoriteService } from './favorite.service';

@Module({
  imports: [],
  controllers: [favoriteController],
  providers: [favoriteService],
})
export class favoriteModule {}