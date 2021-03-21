import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Answer } from 'src/common/entity/Answer.entity';
import { Mission } from 'src/common/entity/Mission.entity';

export class ListAnswersDto extends ResponseDto {
  @ApiProperty({
    example: [
      [
        {
          id: 88,
          userId: 121,
          missionId: 1,
          fileId: 3,
          imageUrl: null,
          content: '335',
          date: '2020-02-28',
          setDate: '2020-02-27',
          createdAt: '2020-02-28 00:08:15',
          updatedAt: '2020-02-28 00:08:15',
          mission: {
            id: 1,
            title: '좋아하는 디저트가 있나요?',
            isContent: true,
            isImage: true,
            cycle: 3,
            createdAt: '2020-01-12 20:54:34',
            updatedAt: '2020-01-12 20:54:34',
          },
          file: {
            id: 3,
            cardUrl: 'https://cdn.moti.company/J9smJXN7.pdf',
            part: 3,
            createdAt: '2020-01-27 18:05:56',
            updatedAt: '2020-01-27 18:05:56',
          },
        },
      ],
    ],
    description: '답변 조회',
    required: true,
  })
  data: Answer[][];
}
