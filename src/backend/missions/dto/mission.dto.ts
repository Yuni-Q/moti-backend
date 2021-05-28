import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Mission } from 'src/backend/common/entity/Mission.entity';

export class MissionDto extends ResponseDto {
  @ApiProperty({
    example: {
      id: 57,
      title: '당신이 불리고 싶은 별명은 무엇인가요?',
      isContent: true,
      isImage: 0,
      cycle: 730,
      createdAt: '2021-02-17T14:08:53.000Z',
      updatedAt: '2021-02-17T14:08:53.000Z',
    },
    description: '미션 조회',
    required: true,
  })
  data: Mission;
}
