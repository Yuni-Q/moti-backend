import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { User } from 'src/common/entity/User.entity';
import { InvalidTokenException } from '../exception/invalid.token.exception';
import { RequireTokenException } from '../exception/require.token.exception';

// TODO : 제거해야함
export const Token = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let token = request.headers.authorization as string;
    if (!token) {
      throw new RequireTokenException();
    }
    if ((token as string).startsWith('Bearer ')) {
      token = token.slice(7);
    }
    let result;
    try {
      result = (await jwt.verify(token, process.env.privateKey as string)) as {
        user: {
          id: number;
        };
      };
    } catch (e) {
      throw new InvalidTokenException();
    }
    if (
      typeof result === 'object' &&
      (!('user' in result) || !result.user.id)
    ) {
      throw new InvalidTokenException();
    }
    return result.user as User;
  },
);

// @Token() token
