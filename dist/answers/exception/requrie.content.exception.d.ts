import { HttpException, HttpStatus } from '@nestjs/common';
export declare class RequireContentException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
