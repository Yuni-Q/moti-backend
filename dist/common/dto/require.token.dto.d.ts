import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from './response.dto';
export declare class RequireTokenDto extends ResponseDto {
    status: HttpStatus;
    message: string;
}
