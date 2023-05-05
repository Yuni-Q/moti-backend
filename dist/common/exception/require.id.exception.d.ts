import { HttpException, HttpStatus } from '@nestjs/common';
export declare class RequireIdException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
