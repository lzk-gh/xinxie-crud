import { Injectable } from '@nestjs/common';
import { Cadre } from './cadre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadreDto } from './cadre.dto';

@Injectable()
export class CadreService {
  constructor(
    @InjectRepository(Cadre)
    private readonly cadreRepository: Repository<Cadre>,
  ) {}

  async create(cadre: CadreDto): Promise<Cadre> {
    return this.cadreRepository.save({
      ...cadre,
      createdAt: new Date(),
    });
  }

  async findAll(): Promise<Cadre[]> {
    return await this.cadreRepository.find();
  }

  async update(id: number, cadre: CadreDto): Promise<Cadre> {
    await this.cadreRepository.update(id, cadre);
    return this.cadreRepository.findOne({ where: { id } });
  }
}
