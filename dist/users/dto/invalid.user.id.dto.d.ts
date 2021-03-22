import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';
export declare class InvalidUserIdDto extends ResponseDto {
    status: HttpStatus;
    message: string;
}
