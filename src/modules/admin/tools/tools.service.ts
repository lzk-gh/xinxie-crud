import { Injectable } from '@nestjs/common';
import { Tools } from './tools.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolsDto } from './tools.dot';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tools)
    private readonly toolsRepository: Repository<Tools>,
  ) {}

  async findAll(): Promise<Tools[]> {
    return await this.toolsRepository.find({
      select: ['id', 'title', 'createdAt', 'link', 'summarize', 'type'],
    });
  }

  async create(tools: ToolsDto): Promise<Tools> {
    return this.toolsRepository.save({
      ...tools,
      createdAt: new Date(),
    });
  }

  async update(id: number, tools: ToolsDto): Promise<Tools> {
    await this.toolsRepository.update(id, tools);
    return this.toolsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.toolsRepository.delete(id);
  }
}
