import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic'; // 元数据键名

/**
 * 自定义装饰器，用于标记公共路由（无需登录）
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
