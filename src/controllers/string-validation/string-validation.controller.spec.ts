import { Test, TestingModule } from '@nestjs/testing';
import { StringValidationController } from './string-validation.controller';

describe('StringValidationController', () => {
  let controller: StringValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StringValidationController],
    }).compile();

    controller = module.get<StringValidationController>(
      StringValidationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
