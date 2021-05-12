import { Module } from '@nestjs/common';
import { catsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [catsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class catsModule {}
