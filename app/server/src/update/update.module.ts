

import { Module } from '@nestjs/common';
import { updateController } from './update.controller';
import { updateService } from './update.service';

@Module({
  imports: [],
  controllers: [updateController],
  providers: [updateService],
})
export class updateModule {}