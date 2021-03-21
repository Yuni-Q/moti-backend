import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { File } from '../../common/entity/File.entity';
export class FileDto extends ResponseDto {
  @ApiProperty({
    example: HttpStatus.CREATED,
    description: '상태 코드',
    required: true,
  })
  public status = HttpStatus.CREATED;

  @ApiProperty({
    example: {
      id: 1,
      cardUrl: 'https://cdn.moti.company/yzjOM7m5.jpg',
      part: 1,
      updatedAt: '2020-01-12T10:50:35.282Z',
      createdAt: '2020-01-12T10:50:35.282Z',
    },
    description: '파일',
    required: true,
  })
  data: File;
}
