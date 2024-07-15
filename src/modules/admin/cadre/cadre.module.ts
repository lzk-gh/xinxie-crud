import { Module } from '@nestjs/common';
import { Cadre } from './cadre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CadreService } from './cadre.service';
import { CadreController } from './cadre.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cadre])],
  providers: [CadreService],
  controllers: [CadreController],
})
export class CadreModule {}
