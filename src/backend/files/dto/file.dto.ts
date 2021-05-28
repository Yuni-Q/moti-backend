import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { File } from '../../common/entity/File.entity';
export class FileDto extends ResponseDto {
  @ApiProperty({
    example: {
      id: 73,
      cardUrl: 'https://cdn.moti.company/로고4 (1)_.jpg',
      part: 55,
      createdAt: null,
      updatedAt: null,
      cardSvgUrl: 'https://cdn.moti.company/yuniq.png',
      cardPngUrl: 'https://cdn.moti.company/yuniq.png',
    },
    description: '파일',
    required: true,
  })
  data: File;
}
