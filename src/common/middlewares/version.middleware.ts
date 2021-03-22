import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VersionMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    try {
      if (request.headers.test === 'test') {
        next();
        return;
      }
      console.log(11, request.headers.appVersion, request.headers.appversion);
      if (
        !!(request.headers.appVersion || request.headers.appversion) &&
        parseInt(
          (request.headers.appVersion || request.headers.appversion) as string,
          10,
        ) <= 2
      ) {
        response.status(200).json({
          status: 1200,
          message: '앱 버전 업데이트가 필요합니다.',
          data: null,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      next();
      return;
    }
    next();
  }
}
