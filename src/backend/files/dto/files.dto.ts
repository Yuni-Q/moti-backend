import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';

import { File, OmitFile } from '../../common/entity/File.entity';

export class FilesDto extends ResponseDto {
  @ApiProperty({
    type: OmitFile,
    isArray: true,
  })
  data: File[];
}
