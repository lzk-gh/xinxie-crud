import { IsEmail, IsString } from "class-validator";

export class MailerDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  isPassed: boolean;
}
