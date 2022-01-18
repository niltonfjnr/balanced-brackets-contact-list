import { Injectable } from '@nestjs/common';

@Injectable()
export class StringValidationService {
  hasValidBalancedBrackets(input: string): boolean {
    return !!input;
  }
}
