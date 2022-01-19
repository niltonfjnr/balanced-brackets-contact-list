import { Controller, Get, Param } from '@nestjs/common';
import { StringValidationService } from 'src/services/string-validation/string-validation.service';

@Controller('string-validation')
export class StringValidationController {
  constructor(
    private readonly stringValidationService: StringValidationService,
  ) {}

  @Get(':input')
  verifyBalancedBrackets(@Param('input') input: string) {
    try {
      const result =
        this.stringValidationService.hasValidBalancedBrackets(input);
      return { status: true, code: 200, result };
    } catch (error) {
      return { status: false, code: 500, error };
    }
  }
}
