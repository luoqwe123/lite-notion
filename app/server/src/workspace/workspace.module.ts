import { Module } from '@nestjs/common';
import { workspaceController } from './workspace.controller.js';
import { workspaceService } from './workspace.service.js';

@Module({
  imports: [],
  controllers: [workspaceController],
  providers: [workspaceService],
})
export class workspaceModule {}