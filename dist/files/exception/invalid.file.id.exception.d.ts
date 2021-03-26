import { HttpException, HttpStatus } from '@nestjs/common';
export declare class InvalidFileIdException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
