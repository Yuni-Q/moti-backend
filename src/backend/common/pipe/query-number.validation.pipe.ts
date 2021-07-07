import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { InvalidQueryException } from '../exception/invalid.query.exception';

@Injectable()
export class QueryNumberValidationPipe implements PipeTransform {
  constructor(private value: number) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      return this.value;
    }
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      throw new InvalidQueryException();
    }
    return number;
  }
}
