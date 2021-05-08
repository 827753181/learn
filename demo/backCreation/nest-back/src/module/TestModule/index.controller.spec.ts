import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './index.controller';
import { TestService } from './index.service';

describe('AppController', () => {
  let testController: TestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    }).compile();

    testController = app.get<TestController>(TestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(testController.test()).toBe('Hello World!');
    });
  });
});
