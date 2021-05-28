import { ApiProperty } from '@nestjs/swagger';

export class MissionBodyDto {
  @ApiProperty({
    example: '질문 제목',
    description: '질문 제목',
    required: true,
  })
  public title: string;
  @ApiProperty({
    example: true,
    description: '글 포함 유무',
    required: true,
  })
  public isContent: boolean;
  @ApiProperty({
    example: false,
    description: '이미지 퐇마 유무',
    required: true,
  })
  public isImage: boolean;
  @ApiProperty({
    example: 30,
    description: '질문 다시 묻지 않을 기간',
    required: true,
  })
  public cycle: number;
}
