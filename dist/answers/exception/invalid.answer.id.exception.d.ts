import { HttpException, HttpStatus } from '@nestjs/common';
export declare class InvalidAnswerIdException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
