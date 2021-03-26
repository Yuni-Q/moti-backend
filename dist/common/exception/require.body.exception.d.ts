import { HttpException, HttpStatus } from '@nestjs/common';
export declare class RequireBodyException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
