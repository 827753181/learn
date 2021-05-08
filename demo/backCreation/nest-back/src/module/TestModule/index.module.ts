import { Module } from '@nestjs/common';
import { TestController } from './index.controller';
import { TestService } from './index.service';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
