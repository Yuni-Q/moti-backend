import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvalidBodyDto } from 'src/common/dto/invalid.body.dto';

export const ValidBody = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { name, birthday, gender } = request.body;
    if (!name || !birthday || !gender) {
      throw new HttpException(
        new InvalidBodyDto(),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return {
      name,
      birthday,
      gender,
    };
  },
);
