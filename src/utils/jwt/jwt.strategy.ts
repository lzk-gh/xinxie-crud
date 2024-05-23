import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from "jwks-rsa";
import * as process from "process";

/**
 * JWT 策略，全局鉴权
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 token
      ignoreExpiration: false, // 不忽略 token 过期时间
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  }

  /**
   * 验证 token 中的 payload
   * @param payload
   * @returns 验证后的用户信息
   */
  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
