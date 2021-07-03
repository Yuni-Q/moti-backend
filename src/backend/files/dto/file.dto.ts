import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';

import { File } from '../../common/entity/File.entity';
export class FileDto extends ResponseDto {
  @ApiProperty({
    type: OmitType(File, ['answers']),
  })
  data: File;
}
