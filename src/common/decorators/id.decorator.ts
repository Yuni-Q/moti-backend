import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IdDto } from '../dto/id.dto';

export const Id = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) {
      throw new HttpException(new IdDto(), HttpStatus.PRECONDITION_FAILED);
    }
    return id;
  },
);
