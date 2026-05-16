import { Module } from '@nestjs/common';
import { teamController } from './team.controller';
import { teamService } from './team.service';

@Module({
  imports: [],
  controllers: [teamController],
  providers: [teamService],
})
export class teamModule {}