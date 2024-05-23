import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../../../utils/jwt/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // imports 属性指定该模块依赖的其他模块。
  // 注册实体: forFeature() 方法将你指定的实体类注册到 TypeORM 连接中，使得 TypeORM 可以识别并管理这些实体对应的数据库表。
  // 创建 Repository: forFeature() 方法会为每个注册的实体类创建一个 Repository。 Repository 是 TypeORM 提供的一个接口，用于执行数据库操作，例如查询、插入、更新和删除数据。
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
