import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequireBodyException } from 'src/backend/common/exception/require.body.exception';

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
      throw new RequireBodyException();
    }
    return {
      title,
      isContent,
      isImage,
      cycle,
    };
  },
);
