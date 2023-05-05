import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ValidTokenException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
