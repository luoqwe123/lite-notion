import { Module } from '@nestjs/common';
import { teamMemberController } from './teamMember.controller.js';
import { teamMemberService } from './teamMember.service.js';

@Module({
  imports: [],
  controllers: [teamMemberController],
  providers: [teamMemberService],
})
export class teamMemberModule {}