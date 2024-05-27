import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from "@nestjs/config";

/**
 * JWT 策略，全局鉴权
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  /**
   * 验证 token 中的 payload
   * @param payload
   * @returns 验证后的用户信息
   */
  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username };
  }
}
