import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log(Sentry.captureException(error));
        return throwError(error);
      }),
    );
  }
}
