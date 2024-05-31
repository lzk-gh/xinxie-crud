import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Join } from './join.entity';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Join])],
  providers: [JoinService],
  controllers: [JoinController],
})
export class JoinModule {}
