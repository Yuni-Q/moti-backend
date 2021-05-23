import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';

export class DiaryAnswersDto extends ResponseDto {
  @ApiProperty({
    example: {
      lastId: 3420,
      direction: 1,
      limit: 10,
      answers: [
        {
          id: 3788,
          imageUrl: null,
          content: '',
          date: '2021-01-17',
          setDate: '2021-01-17',
          no: 2,
          createdAt: '2021-01-17 22:23:39',
          updatedAt: '2021-01-17 22:23:39',
          missionId: 3,
          fileId: 37,
          userId: 119,
          mission: {
            id: 3,
            title: '지금 떠오르는 내가 좋아하는 것 5가지만 이야기 해보아요.',
            isContent: true,
            isImage: false,
            cycle: 14,
            createdAt: '2020-04-01 14:14:17',
            updatedAt: '2020-04-01 14:14:17',
          },
        },
      ],
    },
    description: '답변 조회',
    required: true,
  })
  data: { date: string; limit: number; direction: number; answers: Answer[] };
}
