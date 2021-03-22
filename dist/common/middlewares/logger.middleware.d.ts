import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private logger;
    use(request: Request, response: Response, next: NextFunction): void;
}
