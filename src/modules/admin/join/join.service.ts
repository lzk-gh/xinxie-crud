import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Join } from './join.entity';
import { JoinDto } from './join.dto';
import { Repository } from 'typeorm';

@Injectable()
export class JoinService {
  constructor(
    @InjectRepository(Join)
    private readonly joinRepository: Repository<Join>,
  ) {}

  async findAll(): Promise<Join[]> {
    return await this.joinRepository.find();
  }

  async findOne(name: string): Promise<Join> {
    return this.joinRepository.findOne({ where: { name } });
  }

  async create(join: JoinDto): Promise<Join> {
    return this.joinRepository.save({
      ...join,
      createdAt: new Date(),
    });
  }
}
