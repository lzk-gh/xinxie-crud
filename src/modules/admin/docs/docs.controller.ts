import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { DocsService } from "./docs.service";
import { DocsDto } from "./docs.dto";

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get('list')
  async list(): Promise<DocsDto[]> {
    return this.docsService.findAll();
  }

  @Post('create')
  async create(@Body() docsDto: DocsDto): Promise<{ message: string }> {
    await this.docsService.create(docsDto);
    return {message: '创建成功'}
  }

  @Put('update')
  async update(@Body() docsDto: DocsDto): Promise<{ message: string }> {
    await this.docsService.update(docsDto.id, docsDto);
    return {message: '更新成功'}
  }

  @Post('delete')
  async delete(@Body() docsDto: DocsDto): Promise<{ message: string }> {
    await this.docsService.remove(docsDto.id);
    return {message: '删除成功'}
  }
}
