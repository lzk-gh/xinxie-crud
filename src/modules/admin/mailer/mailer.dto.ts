import { IsEmail, IsNumber, IsString } from 'class-validator';

export class MailerDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  isPassed: boolean;
}
