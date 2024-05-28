import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto, LoginResponse, RegisterDto } from "./auth.dto";
import { Public } from "../../../utils/jwt/public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register') // 处理 POST /auth/register 请求
  async register(@Body() registerDto: RegisterDto): Promise<{ message: string }>{
    // 调用 AuthService 中的注册方法
    await this.authService.register(registerDto);
    // 返回创建的用户信息
    return { message: '注册成功' };
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(loginDto);
  }
}
