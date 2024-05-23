import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { LoginDto, LoginResponse, RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
const CryptoJS = require('crypto-js');

@Injectable() // 将 AuthService 声明为可注入的服务
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 注册
   * @param registerDto
   */
  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto;

    // 先检查用户是否已被注册
    const existingUser: User = await this.userRepository.findOne({
      where: { username: username },
    });
    if (existingUser) {
      throw new HttpException('账号已存在, 请直接登录', HttpStatus.BAD_REQUEST);
    }

    // 先将前端传来的密码解密(AES)
    const decryptedBytes = CryptoJS.AES.decrypt(password, 'xinxie-login');
    const decryptedPassword = CryptoJS.enc.Utf8.stringify(decryptedBytes);

    // 生成盐值
    const salt = await bcrypt.genSalt();
    // 使用 bcrypt 对密码进行哈希加密
    const hashedPassword = await bcrypt.hash(decryptedPassword, salt);
    // 创建新用户实例 - 创建User表中的一条新记录
    const newUser = this.userRepository.create({
      username: username,
      password: hashedPassword,
      createdAt: new Date(),
    });
    // 将新用户存进数据库的User表
    return this.userRepository.save(newUser);
  }

  /**
   * 登录
   * @param loginDto
   */
  async login(
    loginDto: LoginDto,
  ): Promise<LoginResponse> {
    const { username, password } = loginDto;
    // 检查是否有该用户
    const user: User = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.UNAUTHORIZED);
    }
    // 先将前端传来的密码解密(AES)
    const decryptedBytes = CryptoJS.AES.decrypt(password, 'xinxie-login');
    const decryptedPassword = CryptoJS.enc.Utf8.stringify(decryptedBytes);

    // 后使用数据库中存储的哈希值 和 解密后的密码 进行比对
    const isPasswordValid = await bcrypt.compare(
      decryptedPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED);
    }

    // 生成JWT
    const payload = { userId: user.id, username: user };
    const token = this.jwtService.sign(payload);

    // 返回用户信息
    return {
      token,
      username: user.username,
      message: '登录成功',
    };
  }
}

// 去Controller处理http请求
