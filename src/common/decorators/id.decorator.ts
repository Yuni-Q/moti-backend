import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const Id = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) {
      throw new HttpException(
        {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'id가 올바르지 않습니다.',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return id;
  },
);
