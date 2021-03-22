"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeekAnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Answer_entity_1 = require("../../common/entity/Answer.entity");
class WeekAnswerDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
            today: '2021-03-21',
            answers: [
                {
                    id: 1826,
                    imageUrl: 'https://cdn.moti.company/C3EWCyEU',
                    content: '테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던 것테스트 했던sddssdd',
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
                        isContent: 1,
                        isImage: 1,
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
                        mission: '{"date":"2021-03-21","missions":[{"id":2,"title":"좋아하는 디저트가 있나요?","isContent":1,"isImage":1,"cycle":3,"createdAt":"2020-04-01T05:14:17.000Z","updatedAt":"2020-04-01T05:14:17.000Z"},{"id":8,"title":"최근 이룬 버킷리스트가 있나요?","isContent":1,"isImage":0,"cycle":365,"createdAt":"2020-04-01T05:14:17.000Z","updatedAt":"2020-04-01T05:14:17.000Z"},{"id":31,"title":"1분 동안 생각나는 단어를 모두 적어볼까요?","isContent":1,"isImage":0,"cycle":90,"createdAt":"2020-04-01T05:14:17.000Z","updatedAt":"2020-04-01T05:14:17.000Z"}]}',
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
    }),
    __metadata("design:type", Object)
], WeekAnswerDto.prototype, "data", void 0);
exports.WeekAnswerDto = WeekAnswerDto;
//# sourceMappingURL=week.answer.dto.js.map