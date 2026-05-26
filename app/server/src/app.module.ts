import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { workspaceModule } from './workspace/workspace.module.js';
import { teamModule } from './team/team.module.js';
import { CollaborationGateway } from './collaboration/collaboration.getway.js'

@Module({
  imports: [AuthModule,PrismaModule,workspaceModule,teamModule,ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService,CollaborationGateway],
})
export class AppModule {}
