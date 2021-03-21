import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RequireBodyDto } from 'src/common/dto/require.body.dto';

export const ValidBody = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { title, isContent, isImage, cycle } = request.body;
    if (
      !title ||
      (!isContent && isContent !== false) ||
      (!isImage && isImage !== false) ||
      !cycle
    ) {
      throw new HttpException(
        new RequireBodyDto(),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return {
      title,
      isContent,
      isImage,
      cycle,
    };
  },
);
