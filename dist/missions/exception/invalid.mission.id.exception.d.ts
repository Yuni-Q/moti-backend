import { HttpException, HttpStatus } from '@nestjs/common';
export declare class InvalidMissionIdException extends HttpException {
    statusCode: HttpStatus;
    message: string;
    constructor();
}
