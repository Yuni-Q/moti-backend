import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequireIdException } from '../exception/require.id.exception';

export const Id = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const id = parseInt(request.params.id, 10);
  if (isNaN(id)) {
    console.log(id);
    throw new RequireIdException();
  }
  return id;
});
