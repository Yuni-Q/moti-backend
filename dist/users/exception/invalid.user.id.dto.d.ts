import { HttpException, HttpStatus } from '@nestjs/common';
export declare class InvalidUserIdException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
