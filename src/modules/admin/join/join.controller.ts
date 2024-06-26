import {
  Body,
  Controller,
  Get,
  NotFoundException, Patch,
  Post,
} from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinDto, UpdateJoinDto } from './join.dto';
import { Public } from '../../../utils/jwt/public.decorator';
import { Join } from './join.entity';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  @Get('list')
  async list(): Promise<Join[]> {
    return this.joinService.findAll();
  }

  @Post('list_one')
  async listOne(@Body() joinDto: JoinDto): Promise<Join> {
    const student = await this.joinService.findOne(joinDto.name);
    if (!student) {
      throw new NotFoundException('未找到该学生');
    }
    return student;
  }

  @Patch('update_status')
  async update(@Body() updateJoinDtos: UpdateJoinDto[]): Promise<{ message: string }> {
    await this.joinService.update(updateJoinDtos);
    return { message: '更新状态成功' };
  }

  @Public()
  @Post('create')
  async create(@Body() joinDto: JoinDto): Promise<{ message: string }> {
    await this.joinService.create(joinDto);
    return { message: '提交成功' };
  }
}
