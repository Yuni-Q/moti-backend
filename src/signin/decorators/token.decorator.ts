import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';

export const Token = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let token = request.headers.authorization as string;
    if (!token) {
      throw new HttpException(new RequireTokenDto(), HttpStatus.BAD_REQUEST);
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }
    return token;
  },
);

// @Token() token
