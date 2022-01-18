import { Injectable } from '@nestjs/common';

@Injectable()
export class StringValidationService {
  private validOpenChars = ['(', '{', '['];
  private validCloseChars = [')', '}', ']'];

  private getCurrentCharIndex(input: string) {
    return this.validOpenChars.indexOf(input[0]);
  }

  private getCurrentCloseChar(currentCharIndex: number) {
    return this.validCloseChars[currentCharIndex];
  }

  private getCurrentCloseCharIndex(input: string, currentCloseChar: string) {
    return input.indexOf(currentCloseChar);
  }

  private getResidualInput(input: string, currentCloseCharIndex: number) {
    return input
      .replace(input[0], '')
      .replace(input[currentCloseCharIndex], '');
  }

  private validateBrackets(input: string): boolean {
    const currentCharIndex = this.getCurrentCharIndex(input);
    if (currentCharIndex < 0) {
      return false;
    }

    const currentCloseChar = this.getCurrentCloseChar(currentCharIndex);
    const currentCloseCharIndex = this.getCurrentCloseCharIndex(
      input,
      currentCloseChar,
    );
    if (currentCloseCharIndex < 0) {
      return false;
    }

    const residualInput = this.getResidualInput(input, currentCloseCharIndex);
    if (residualInput.length > 0) {
      return this.validateBrackets(residualInput);
    }
    return true;
  }

  hasValidBalancedBrackets(input: string): boolean {
    const couldValidate = input && typeof input === 'string';
    if (!couldValidate) {
      return false;
    }
    return this.validateBrackets(input);
  }
}
