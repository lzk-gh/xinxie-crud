import { Controller, Get, Post, Put } from '@nestjs/common';
import { CadreService } from './cadre.service';
import { Public } from '../../../utils/jwt/public.decorator';
import { CadreDto } from './cadre.dto';

@Controller('cadre')
export class CadreController {
  constructor(private readonly cadreService: CadreService) {}

  @Public()
  @Get('list')
  async list(): Promise<CadreDto[]> {
    return this.cadreService.findAll();
  }

  @Post('create')
  async create(cadreDto: CadreDto): Promise<{ message: string }> {
    await this.cadreService.create(cadreDto);
    return { message: '创建成功' };
  }

  @Put('update')
  async update(cadreDto: CadreDto): Promise<{ message: string }> {
    await this.cadreService.update(cadreDto.id, cadreDto);
    return { message: '更新成功' };
  }
}
