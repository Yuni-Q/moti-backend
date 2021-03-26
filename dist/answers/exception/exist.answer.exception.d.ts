import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ExistAnswerException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
