import { DynamicModule, Module } from '@nestjs/common';
import { catsController } from 'src/controllers/catsControllers/cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [catsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class catsModule {}
