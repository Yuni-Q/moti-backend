import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequireBodyException } from 'src/common/exception/require.body.exception';

export const ValidBody = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { name, birthday, gender } = request.body;
    if (!name || !birthday || !gender) {
      throw new RequireBodyException();
    }
    return {
      name,
      birthday,
      gender,
    };
  },
);
