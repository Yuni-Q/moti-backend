import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';

import { File, OmitFile } from '../../common/entity/File.entity';

export class FileDto extends ResponseDto {
  @ApiProperty({
    type: OmitFile,
  })
  data: File;
}
