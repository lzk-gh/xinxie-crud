import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Docs } from "./docs.entity";
import { DocsService } from "./docs.service";
import { DocsController } from "./docs.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Docs])
  ],
  providers: [DocsService],
  controllers: [DocsController],
})

export class DocsModule {}
