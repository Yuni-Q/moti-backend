import { HttpException, HttpStatus } from '@nestjs/common';
export declare class RequireTokenException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
