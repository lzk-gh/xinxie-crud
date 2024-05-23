import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "./public.decorator";

/**
 * JWT 守卫，全局鉴权，用于路由守卫，验证用户是否已登录
 */
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // 依赖注入 Reflector，用于获取路由元数据

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true; // 公共路由，直接放行
    }

    // 非公共路由，进行 JWT 验证
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated(); // Passport 验证后，会在 request 对象上挂载 isAuthenticated 方法
  }
}
