import { Test, TestingModule } from '@nestjs/testing';
import { StringValidationService } from './string-validation.service';

describe('StringValidationService', () => {
  let service: StringValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StringValidationService],
    }).compile();

    service = module.get<StringValidationService>(StringValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('● should receive "(){}[]" as input and return true', () => {
    const input = '(){}[]';
    const result = service.hasValidBalancedBrackets(input);
    expect(result).toBe(true);
  });

  it('● should receive "[{()}](){}" as input and return true', () => {
    const input = '[{()}](){}';
    const result = service.hasValidBalancedBrackets(input);
    expect(result).toBe(true);
  });

  it('● should receive "[]{()" as input and return false', () => {
    const input = '[]{()';
    const result = service.hasValidBalancedBrackets(input);
    expect(result).toBe(false);
  });

  it('● should receive "[{)]" as input and return false', () => {
    const input = '[{)]';
    const result = service.hasValidBalancedBrackets(input);
    expect(result).toBe(false);
  });
});
