import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用 CORS，允许所有来源
  app.enableCors();

  // 或者，使用 CorsOptions 自定义 CORS 策略
  app.enableCors({
    origin: 'http://localhost:5173', // 只允许来自这个 origin 的请求
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    credentials: true, // 允许发送 Cookie
  });

  app.use(passport.initialize()); // 初始化 Passport

  await app.listen(3000);
}
bootstrap();
