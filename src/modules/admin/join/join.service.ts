import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Join } from './join.entity';
import { JoinDto, UpdateJoinDto } from './join.dto';
import { Repository } from 'typeorm';
import { from, lastValueFrom, mergeMap } from 'rxjs';

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

  async update(updateJoinDtos: UpdateJoinDto[]): Promise<void> {
    try {
      await lastValueFrom(
        from(updateJoinDtos).pipe(
          mergeMap((dto) =>
            this.joinRepository.update(dto.id, { status: dto.status })
          )
        )
      );
      console.log('所有更新操作已完成');
    } catch (err) {
      console.error('更新过程中出现错误:', err);
    }
  }

  async create(join: JoinDto): Promise<Join> {
    return this.joinRepository.save({
      ...join,
      createdAt: new Date(),
    });
  }
}
