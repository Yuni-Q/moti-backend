import { HttpException } from '@nestjs/common';
export declare class InvalidUserIdException extends HttpException {
    statusCode: number;
    message: string;
    constructor();
}
