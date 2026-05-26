import { Module } from '@nestjs/common';
import { teamController } from './team.controller.js';
import { teamService } from './team.service.js';

@Module({
  imports: [],
  controllers: [teamController],
  providers: [teamService],
})
export class teamModule {}