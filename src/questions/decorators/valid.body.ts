import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequireBodyException } from 'src/common/exception/require.body.exception';

export const ValidBody = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { content } = request.body;
    if (!content) {
      throw new RequireBodyException();
    }
    return {
      content,
    };
  },
);
