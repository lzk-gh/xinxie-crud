import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tools } from "./tools.entity";
import { ToolsService } from "./tools.service";
import { ToolsController } from "./tools.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Tools])
  ],
  providers: [ToolsService],
  controllers: [ToolsController],
})

export class ToolsModule {}
