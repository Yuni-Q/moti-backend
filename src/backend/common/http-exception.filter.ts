import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as {
      status?: number;
      statusCode?: number;
      message: string | string[];
      data?: any;
      error?: string;
    }; // class-validator type
    if (status === 403) {
      err.statusCode = 1100;
      err.message = '올바르지 못한 토큰 입니다.';
    }
    if (err.message instanceof Array) {
      return response.status(status).json({
        status: HttpStatus.PRECONDITION_FAILED,
        statusCode: HttpStatus.PRECONDITION_FAILED,
        message: err.message[0],
        data: err?.data?.data,
      });
    }

    if (err.message) {
      return response.status(status).json({
        status: err.statusCode || status,
        statusCode: err.statusCode || status,
        message: err.message,
        data: err?.data?.data,
      });
    }

    response.status(status).json({
      status: err.statusCode || status,
      statusCode: err.statusCode || status,
      message: err,
      data: err?.data?.data,
    });
  }
}
