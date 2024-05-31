import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinDto } from './join.dto';
import { Public } from "../../../utils/jwt/public.decorator";

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  @Get('list')
  async list(): Promise<JoinDto[]> {
    return this.joinService.findAll();
  }

  @Post('list_one')
  async listOne(@Body() joinDto: JoinDto): Promise<JoinDto> {
    return this.joinService.findOne(joinDto.name);
  }

  @Public()
  @Post('create')
  async create(@Body() joinDto: JoinDto): Promise<{ message: string }> {
    await this.joinService.create(joinDto);
    return { message: '提交成功' };
  }
}
