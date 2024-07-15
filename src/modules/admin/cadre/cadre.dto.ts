import { IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CadreDto {
  @IsNumber()
  id: number;

  // 姓名
  @IsString()
  name: string;

  // 头像
  @IsString()
  avatar: string;

  // 职位
  @IsString()
  position: string;

  // 座右铭
  @IsString()
  motto: string;

  // 哪届干部
  @Column()
  classOf: string;
}
