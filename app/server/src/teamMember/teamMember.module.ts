import { Module } from '@nestjs/common';
import { teamMemberController } from './teamMember.controller';
import { teamMemberService } from './teamMember.service';

@Module({
  imports: [],
  controllers: [teamMemberController],
  providers: [teamMemberService],
})
export class teamMemberModule {}