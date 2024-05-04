import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "../config/database.config";

@Module({
  imports: [
    // 加载配置
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig]
    }),
    // 异步创建TypeORM连接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
