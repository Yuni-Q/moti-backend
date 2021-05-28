import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Answer } from 'src/backend/common/entity/Answer.entity';

export class WeekAnswerDto extends ResponseDto {
  @ApiProperty({
    example: {
      today: '2021-03-21',
      answers: [
        {
          id: 1826,
          imageUrl: 'https://cdn.moti.company/C3EWCyEU',
          content:
            '테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던sddssdd',
          date: '2020-09-08',
          setDate: '2020-09-08',
          no: 1,
          createdAt: '2020-09-08T08:34:25.000Z',
          updatedAt: '2021-01-16T13:04:41.000Z',
          missionId: 7,
          fileId: 13,
          userId: 681,
          file: {
            id: 13,
            cardUrl: 'https://cdn.moti.company/parts/1_3.pdf',
            part: 1,
            createdAt: '2020-04-01T06:50:59.000Z',
            updatedAt: '2020-09-07T13:08:34.000Z',
            cardSvgUrl: 'https://cdn.moti.company/parts/1_3.svg',
            cardPngUrl: 'https://cdn.moti.company/parts/1_3.png',
          },
          mission: {
            id: 7,
            title: '오늘 당신의 패션을 알려주세요!',
            isContent: true,
            isImage: true,
            cycle: 3,
            createdAt: '2020-04-01T05:14:17.000Z',
            updatedAt: '2020-04-01T05:14:17.000Z',
          },
          user: {
            id: 681,
            birthday: '2020-03-18',
            email: 'yuni@woowahan.com',
            name: '모티22',
            gender: '남',
            refreshDate: '2021-03-21',
            refreshToken: null,
            mission:
              '{"date":"2021-03-21","missions":[{"id":2,"title":"좋아하는 디저트가 있나요?","isContent":1,"isImage":1,"cycle":3,"createdAt":"2020-04-01T05:14:17.000Z","updatedAt":"2020-04-01T05:14:17.000Z"},{"id":8,"title":"최근 이룬 버킷리스트가 있나요?","isContent":1,"isImage":0,"cycle":365,"createdAt":"2020-04-01T05:14:17.000Z","updatedAt":"2020-04-01T05:14:17.000Z"},{"id":31,"title":"1분 동안 생각나는 단어를 모두 적어볼까요?","isContent":1,"isImage":0,"cycle":90,"createdAt":"2020-04-01T05:14:17.000Z","updatedAt":"2020-04-01T05:14:17.000Z"}]}',
            snsId: '102195187067826370203',
            snsType: 'google',
            createdAt: '2020-09-07T13:13:40.000Z',
            updatedAt: '2021-01-30T13:25:28.000Z',
          },
        },
      ],
    },
    description: '답변 조회',
    required: true,
  })
  data: { today: string; answers: Answer[] };
}
