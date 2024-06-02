import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../prisam/database.config';
import { AuthModule } from './modules/admin/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './utils/jwt/jwt.guard';
import { DocsModule } from './modules/admin/docs/docs.module';
import { ToolsModule } from './modules/admin/tools/tools.module';
import { JoinModule } from './modules/admin/join/join.module';
import { MailerModule } from './modules/admin/mailer/mailer.module';

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
    DocsModule,
    ToolsModule,
    JoinModule,
    MailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
