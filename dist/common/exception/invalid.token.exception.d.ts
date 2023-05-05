import { HttpException } from '@nestjs/common';
export declare class InvalidTokenException extends HttpException {
    statusCode: number;
    message: string;
    constructor();
}
