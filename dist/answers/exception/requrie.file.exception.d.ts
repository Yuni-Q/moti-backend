import { HttpException, HttpStatus } from '@nestjs/common';
export declare class RequireFileException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
