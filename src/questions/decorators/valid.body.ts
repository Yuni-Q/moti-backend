import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RequireBodyDto } from 'src/common/dto/require.body.dto';

export const ValidBody = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { content } = request.body;
    if (!content) {
      throw new HttpException(
        new RequireBodyDto(),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return {
      content,
    };
  },
);
