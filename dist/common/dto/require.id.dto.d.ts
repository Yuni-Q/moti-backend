import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from './response.dto';
export declare class RequireIdDto extends ResponseDto {
    status: HttpStatus;
    message: string;
}
