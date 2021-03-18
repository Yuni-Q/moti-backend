import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status?: number;
  statusCode?: number;
  message?: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: Response<T>) => {
        const status = data.status || HttpStatus.OK;
        context.switchToHttp().getResponse().status(status);
        return {
          status: data.statusCode || status,
          message: data.message || '',
          data: data.data,
        };
      }),
    );
  }
}
