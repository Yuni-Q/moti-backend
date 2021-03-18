import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { User } from 'src/entity/User.entity';

export const Token = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let token = request.headers.authorization as string;
    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '토큰이 필요합니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        {
          status: 1100,
          message: '올바르지 못한 토큰 입니다.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (typeof result === 'object' && !('user' in result)) {
      throw new HttpException(
        {
          status: 1100,
          message: '올바르지 못한 토큰 입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!result.user.id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '유저 아이디가 존재하지 않습니다. 토큰을 확인해 주세요.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result.user as User;
  },
);

// @Token() token
