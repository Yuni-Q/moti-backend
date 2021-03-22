import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from 'src/common/dto/response.dto';
export declare class InvalidMissionIdDto extends ResponseDto {
    status: HttpStatus;
    message: string;
}
