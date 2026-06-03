import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response.inteceptors';
import { Validate } from '@/common/validate';
import { WsAdapter } from '@nestjs/platform-ws'
import { setupYjsWebSocketServer } from './collaboration/collaboration.server';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.useWebSocketAdapter(new WsAdapter(app)) // 支持 ws
  app.useGlobalPipes(new Validate({
    skipMissingProperties: true,
  }));
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
  });
  // 获得 http server
  const httpServer = app.getHttpServer();
  setupYjsWebSocketServer(httpServer)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
