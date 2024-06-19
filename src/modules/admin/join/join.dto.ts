import { IsArray, IsNumber, IsString } from 'class-validator';

export class JoinDto {
  // 可批量更新状态
  @IsArray()
  @IsNumber()
  ids: number[];

  @IsString()
  studentId: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  profession: string;

  @IsString()
  department: string;

  @IsString()
  reason: string;

  @IsNumber()
  status: number;
}

export class UpdateJoinDto {
  id: number;
  status: number;
}
