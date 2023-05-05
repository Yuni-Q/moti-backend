import { ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class SentryInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler): Observable<any>;
}
