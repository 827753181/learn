import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { catsModule } from './cats/cats.module';

@Module({
  imports: [catsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
