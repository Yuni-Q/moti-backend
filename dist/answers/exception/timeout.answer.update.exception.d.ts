import { HttpException, HttpStatus } from '@nestjs/common';
export declare class TimeoutAnswerUpdateException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
