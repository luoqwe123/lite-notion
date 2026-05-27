import { Module } from '@nestjs/common';
import { workspaceController } from './workspace.controller';
import { workspaceService } from './workspace.service';

@Module({
  imports: [],
  controllers: [workspaceController],
  providers: [workspaceService],
})
export class workspaceModule {}