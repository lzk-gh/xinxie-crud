import { Injectable } from '@nestjs/common';
import { Docs } from './docs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocsDto } from './docs.dto';

@Injectable()
export class DocsService {
  constructor(
    @InjectRepository(Docs)
    private readonly docsRepository: Repository<Docs>,
  ) {}

  async findAll(): Promise<Docs[]> {
    return await this.docsRepository.find({
      select: ['id', 'title', 'createdAt', 'link', 'summarize', 'type'],
    });
  }

  async create(docs: DocsDto): Promise<Docs> {
    return this.docsRepository.save({
      ...docs,
      createdAt: new Date(),
    });
  }

  async update(id: number, docs: DocsDto): Promise<Docs> {
    await this.docsRepository.update(id, docs);
    return this.docsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.docsRepository.delete(id);
  }
}
