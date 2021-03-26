import { HttpException, HttpStatus } from '@nestjs/common';
export declare class CustomInternalServerErrorException extends HttpException {
    statusCode: HttpStatus;
    message: any;
    constructor(message: any);
}
