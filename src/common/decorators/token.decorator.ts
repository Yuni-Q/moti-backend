import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '토큰이 필요합니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return request.headers.authorization;
  },
);

// @Token() token
