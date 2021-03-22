import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Mission } from 'src/common/entity/Mission.entity';

export class MissionsDto extends ResponseDto {
  @ApiProperty({
    example: {
      refresh: true,
      missions: [
        {
          id: 57,
          title: '당신이 불리고 싶은 별명은 무엇인가요?',
          isContent: true,
          isImage: false,
          cycle: 730,
          createdAt: '2021-02-17T14:08:53.000Z',
          updatedAt: '2021-02-17T14:08:53.000Z',
        },
        {
          id: 22,
          title: '최근 가장 가지고 싶은 물건이 있나요?',
          isContent: true,
          isImage: false,
          cycle: 10,
          createdAt: '2020-04-01T05:14:17.000Z',
          updatedAt: '2020-04-01T05:14:17.000Z',
        },
        {
          id: 36,
          title:
            '어떤 일을 하고 싶었지만 못했던 일이 무엇인가요? 그리고 그것을 못했던 이유는 무엇일까요?',
          isContent: true,
          isImage: false,
          cycle: 300,
          createdAt: '2020-04-01T05:14:17.000Z',
          updatedAt: '2020-04-01T05:14:17.000Z',
        },
      ],
    },
    description: '오늘의 미션 3가지와 미션 재발급 가능 여부',
    required: true,
  })
  data: { refresh: boolean; missions: Mission[] };
}
