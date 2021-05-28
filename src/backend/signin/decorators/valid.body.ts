import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequireBodyException } from 'src/backend/common/exception/require.body.exception';

export const ValidBody = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { snsType } = request.body;
    if (!snsType) {
      throw new RequireBodyException();
    }
    return {
      snsType,
    };
  },
);
