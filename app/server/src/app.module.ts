import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { workspaceModule } from './workspace/workspace.module';
import { teamModule } from './team/team.module';
import { CollaborationGateway } from './collaboration/collaboration.getway'

@Module({
  imports: [AuthModule,PrismaModule,workspaceModule,teamModule,ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService,CollaborationGateway],
})
export class AppModule {}
