import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ResponseInterceptor } from './response.inteceptors.js';
import { Validate } from '@/common/validate.js';
import { WsAdapter } from '@nestjs/platform-ws'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useWebSocketAdapter(new WsAdapter(app)) // 支持 ws
  app.useGlobalPipes(new Validate());
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
