import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { User } from 'src/common/entity/User.entity';
import { InvalidTokenDto } from '../dto/invalid.token.dto';
import { RequireTokenDto } from '../dto/require.token.dto';

export const Token = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let token = request.headers.authorization as string;
    if (!token) {
      throw new HttpException(new RequireTokenDto(), HttpStatus.BAD_REQUEST);
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
      throw new HttpException(new InvalidTokenDto(), HttpStatus.BAD_REQUEST);
    }
    if (
      typeof result === 'object' &&
      (!('user' in result) || !result.user.id)
    ) {
      throw new HttpException(new InvalidTokenDto(), HttpStatus.BAD_REQUEST);
    }
    return result.user as User;
  },
);

// @Token() token
