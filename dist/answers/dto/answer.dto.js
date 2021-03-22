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
exports.AnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/dto/response.dto");
const Answer_entity_1 = require("../../common/entity/Answer.entity");
const Mission_entity_1 = require("../../common/entity/Mission.entity");
class AnswerDto extends response_dto_1.ResponseDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: {
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
            user: {
                id: 681,
                birthday: '2020-03-18',
                email: 'yuni@woowahan.com',
                name: '모티22',
                gender: '남',
                refreshDate: '2021-03-22',
                refreshToken: null,
                mission: '{"date":"2021-03-22","missions":[{"id":10,"title":"한달의 휴가가 생기면 무엇을 하실건가요?","isContent":true,"isImage":false,"cycle":90,"createdAt":"2020-04-01 14:14:17.000000","updatedAt":"2020-04-01 14:14:17.000000"},{"id":66,"title":"지난 한 달은 당신에게 어떤 시간이었나요?","isContent":true,"isImage":false,"cycle":31,"createdAt":"2021-02-17 23:11:25.000000","updatedAt":"2021-02-17 23:11:25.000000"},{"id":46,"title":"당신을 행복하게 만드는 순간은 언제인가요?","isContent":true,"isImage":true,"cycle":60,"createdAt":"2021-02-17 23:05:20.000000","updatedAt":"2021-02-17 23:05:20.000000"}]}',
                snsId: '102195187067826370203',
                snsType: 'google',
                createdAt: '2020-09-07T13:13:40.000Z',
                updatedAt: '2021-03-22T10:21:45.000Z',
            },
        },
        description: '답변 조회',
        required: true,
    }),
    __metadata("design:type", Answer_entity_1.Answer)
], AnswerDto.prototype, "data", void 0);
exports.AnswerDto = AnswerDto;
//# sourceMappingURL=answer.dto.js.map