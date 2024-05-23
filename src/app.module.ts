import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../prisam/database.config';
import { AuthModule } from './modules/admin/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from "process";
import { JwtGuard } from "./utils/jwt/jwt.guard";

@Module({
  imports: [
    // 加载配置
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    // 异步创建TypeORM连接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '20s' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtGuard,
    }
  ],
})
export class AppModule {}
