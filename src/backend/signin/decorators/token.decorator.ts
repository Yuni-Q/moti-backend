import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequireTokenException } from 'src/backend/common/exception/require.token.exception';

export const Token = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  let token = request.headers.authorization as string;
  if (!token) {
    throw new RequireTokenException();
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  return token;
});

// @Token() token
