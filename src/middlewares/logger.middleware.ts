import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, respones: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    respones.on('finish', () => {
      const { statusCode } = respones;
      const contentLength = respones.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} ${userAgent} ${ip}`,
      );
    });
    next();
  }
}
