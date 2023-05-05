import { HttpException, HttpStatus } from '@nestjs/common';
export declare class InvalidQueryException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
