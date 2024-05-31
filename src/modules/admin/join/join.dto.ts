import { IsString } from 'class-validator';

export class JoinDto {
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
}
