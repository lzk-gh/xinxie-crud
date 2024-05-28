import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ToolsDto } from "./tools.dot";
import { ToolsService } from "./tools.service";

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get('list')
  async list(): Promise<ToolsDto[]> {
    return this.toolsService.findAll();
  }

  @Post('create')
  async create(@Body() toolsDto: ToolsDto): Promise<{ message: string }> {
    await this.toolsService.create(toolsDto);
    return {message: '创建成功'}
  }

  @Put('update')
  async update(@Body() toolsDto: ToolsDto): Promise<{ message: string }> {
    await this.toolsService.update(toolsDto.id, toolsDto);
    return {message: '更新成功'}
  }

  @Post('delete')
  async delete(@Body() toolsDto: ToolsDto): Promise<{ message: string }> {
    await this.toolsService.remove(toolsDto.id);
    return {message: '删除成功'}
  }
}
