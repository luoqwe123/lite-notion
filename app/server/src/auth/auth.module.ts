import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from  "@nestjs/config"
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/auth.guard';

@Module({
  imports: [JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(config:ConfigService)=>{
        return { 
          secret:config.get("TOKEN_SECRET"),
          signOptions:{ expiresIn: `${config.get("TOKEN_EXPIRES_IN")}d`}
        }
    }
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,JwtAuthGuard],
})
export class AuthModule {}
