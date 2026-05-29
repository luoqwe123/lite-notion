import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { workspaceModule } from './workspace/workspace.module';
import { teamModule } from './team/team.module';
import { documentModule } from './document/document.module';
// import { CollaborationGateway } from './collaboration/collaboration.server'

@Module({
  imports: [AuthModule,PrismaModule,workspaceModule,teamModule,documentModule,ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
