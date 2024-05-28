import { IsNumber, IsString } from "class-validator";

export class DocsDto {
  @IsNumber()
  id: number;

  @IsNumber()
  type: number;

  @IsString()
  title: string;

  @IsString()
  summarize: string;

  @IsString()
  link: string;
}
