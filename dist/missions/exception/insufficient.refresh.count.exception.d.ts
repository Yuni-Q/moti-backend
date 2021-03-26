import { HttpException, HttpStatus } from '@nestjs/common';
export declare class InsufficientRefreshCountException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
