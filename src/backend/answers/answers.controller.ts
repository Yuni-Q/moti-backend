import { Controller, Delete, Get, HttpStatus, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Id } from 'src/backend/common/decorators/id.decorator';
import { ImageUploader } from 'src/backend/common/decorators/image-uploader.decorator';
import { TokenUserId } from 'src/backend/common/decorators/token-user-id.decorator';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { CustomInternalServerErrorException } from 'src/backend/common/exception/custom.interval.server.error.exception';
import { RequireBodyException } from 'src/backend/common/exception/require.body.exception';
import { RequireTokenException } from 'src/backend/common/exception/require.token.exception';
import { TransformInterceptor } from 'src/backend/common/interceptors/transformInterceptor.interceptor';
import { getDateString, getMonthDate, getNow } from 'src/backend/common/util/date';
import { FilesService } from 'src/backend/files/files.service';
import { MissionsService } from 'src/backend/missions/missions.service';

import { QueryNumberValidationPipe } from '../common/pipe/query-number.validation.pipe';

import { AnswersService } from './answers.service';
import { AnswerDaysDto } from './dto/answer.days.dto';
import { AnswerDto } from './dto/answer.dto';
import { AnswersDto } from './dto/answers.dto';
import { DeleteAnswerDto } from './dto/delete.answer.dto';
import { DiaryAnswersDto } from './dto/diary.answers.dto';
import { ListAnswersDto } from './dto/list.answers.dto';
import { MonthAnswersDto } from './dto/month.answers.dto';
import { WeekAnswerDto } from './dto/week.answer.dto';
import { ExistAnswerException } from './exception/exist.answer.exception';
import { RequireContentException } from './exception/requrie.content.exception';
import { RequireFileException } from './exception/requrie.file.exception';

@ApiResponse({
  status: new RequireTokenException().getStatus(),
  type: RequireTokenException,
  description: new RequireTokenException().message,
})
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('authorization')
@ApiTags('answers')
@Controller('api/v1/answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly missionsService: MissionsService,
    private readonly filesService: FilesService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: AnswerDaysDto,
    description: '개인이 답변한 날짜 리스트',
  })
  @Get('/days')
  async getDays(@TokenUserId() userId): Promise<AnswerDaysDto> {
    try {
      const answers = await this.answersService.getDays({ userId });
      const dateList = answers.map((answer) => {
        console.log(answers);
        console.log(answer);
        return answer.date;
      });
      return { data: dateList };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AnswerDto,
    description: '특정 날짜의 답변',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: '답변을 원하는 날짜',
  })
  @Get()
  async date(@TokenUserId() userId, @Query('date') dateString): Promise<AnswerDto> {
    try {
      const date = dateString ? getDateString({ date: dateString }) : null;
      const answer = date
        ? await this.answersService.getAnswerByDateAndUserId({ userId, date })
        : await this.answersService.getAnswerByUserId({ userId });
      return { data: answer };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: new WeekAnswerDto().statusCode,
    type: WeekAnswerDto,
    description: '최근 답변 리스트',
  })
  @Get('week')
  async week(@TokenUserId() userId): Promise<WeekAnswerDto> {
    try {
      const answer = await this.answersService.getAnswerByUserId({ userId });
      const recentAnswers = answer?.setDate
        ? await this.answersService.getRecentAnswers({
            userId,
            setDate: answer.setDate,
          })
        : ([] as Answer[]);
      // 6개의 파츠를 모두 모은 날이 오늘이 아니면 새로운 것을 준다
      const answers = !!recentAnswers && !this.answersService.hasSixParsAndNotToday(recentAnswers) ? recentAnswers : [];
      const today = getDateString({});
      return { data: { today, answers } };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DiaryAnswersDto,
    description: '일기 형식으로 답변 조회',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'date',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'limit',
  })
  @ApiQuery({
    name: 'direction',
    required: false,
    description: 'direction (0: get older diaries, 1: get new diaries)',
  })
  @Get('diary')
  async diary(
    @TokenUserId() userId,
    @Query('date') dateString,
    @Query('limit', new QueryNumberValidationPipe(100)) limit,
    @Query('direction', new QueryNumberValidationPipe(0)) direction,
  ): Promise<DiaryAnswersDto> {
    try {
      const date = dateString ? getDateString({ date: dateString }) : null;
      let answers = date
        ? await this.answersService.getAnswersDiaryByDate({
            userId,
            date,
            limit,
            direction,
          })
        : await await this.answersService.getAnswersDiary({ userId, limit });

      if (date && direction === 0) {
        // 날짜 오름차순으로 재 정렬
        answers = answers.sort((answer, compareAnswer) => {
          return answer.date > compareAnswer.date ? 1 : -1;
        });
      }
      return { data: { date, limit, direction, answers } };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ListAnswersDto,
    description: '답변 리스트',
  })
  @ApiQuery({
    name: 'answerId',
    required: false,
    description: '특정 날짜의 답변',
  })
  @Get('list')
  async list(@TokenUserId() userId, @Query('answerId') answerId): Promise<ListAnswersDto> {
    try {
      let answer: Answer;
      const answers = [] as Answer[][];
      for (let i = 0; i < 4; i++) {
        answer = answerId
          ? await this.answersService.getAnswerByUserIdAndLessThanId({
              userId,
              answerId,
            })
          : await this.answersService.getAnswerByUserId({ userId });
        if (!answer) {
          break;
        }
        answers[i] = await this.answersService.getAnswersByUserIdAndSetDate({
          userId,
          setDate: answer.setDate,
        });
        answerId = answers[i][answers[i].length - 1].id;
      }
      return { data: answers };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AnswersDto,
    description: '답변 리스트',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id',
  })
  @Get('list/:id')
  async listId(@TokenUserId() userId, @Id() id): Promise<AnswersDto> {
    try {
      const answer = await this.answersService.getAnswerByIdAndUserId({
        id,
        userId,
      });
      if (!answer || !answer.setDate) {
        return { data: [] };
      }
      const setDate = answer.setDate;
      const answers = await this.answersService.getAnswersByUserIdAndSetDate({
        userId,
        setDate,
      });
      return { data: answers };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: MonthAnswersDto,
    description: '월간 답변 리스트',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: '특정 날짜의 답변',
  })
  @Get('month')
  async month(@TokenUserId() userId, @Query('date') date): Promise<MonthAnswersDto> {
    try {
      const now = getNow(date);
      const { firstDate, lastDate } = getMonthDate(now);
      const notGroupAnswers = await this.answersService.getMonthAnswers({
        firstDate,
        lastDate,
        userId,
      });
      const answers = notGroupAnswers.reduce(
        (acc: { [key: string]: Answer[] }, it: Answer) => ({
          ...acc,
          [it.setDate]: [...(acc[it.setDate] || []), it],
        }),
        {},
      );
      const monthAnswer = Object.values(answers) as Answer[][];
      return { data: { date: firstDate, monthAnswer } };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AnswerDto,
    description: '단건 답변 조회',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id',
  })
  @Get(':id')
  async get(@TokenUserId() userId, @Id() id): Promise<AnswerDto> {
    try {
      const result = await this.answersService.getAnswerByIdAndUserId({
        id,
        userId,
      });
      return { data: result };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AnswerDto,
    description: '답변',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          format: 'string',
        },
        missionId: {
          type: 'integer',
          format: 'integer',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('')
  async post(@TokenUserId() userId, @ImageUploader('answers') body): Promise<AnswerDto> {
    try {
      const { file: imageUrl, content, missionId } = body;
      if ((!imageUrl && !content) || !missionId) {
        throw new RequireBodyException();
      }
      const date = getDateString({});
      const answer = await this.answersService.getAnswerByDateAndUserId({
        userId,
        date,
      });
      if (answer) {
        throw new ExistAnswerException();
      }

      const lastAnswer = await this.answersService.getAnswerByUserId({
        userId,
      });
      // 데이터가 있어야 무언가를 할수가...
      const recentAnswers: Answer[] = lastAnswer?.setDate
        ? await this.answersService.getRecentAnswers({
            userId,
            setDate: lastAnswer.setDate,
          })
        : [];
      // 6개의 파츠를 모두 모았다면 새로운 파츠를 시작한다.
      const setDate = this.answersService.getSetDate(recentAnswers);
      const no = this.answersService.getNo(recentAnswers);
      const partNumber = this.answersService.getPartNumber(recentAnswers);
      const cardFile = await this.filesService.getFileByPart(partNumber);
      const { id: fileId = 1 } = cardFile;
      const mission = await this.missionsService.checkMission({
        id: missionId,
      });
      if (!!mission?.isImage && !imageUrl) {
        throw new RequireFileException();
      }
      if (!!mission?.isContent && !content) {
        throw new RequireContentException();
      }
      const result = await this.answersService.create({
        userId,
        missionId,
        imageUrl,
        fileId,
        content,
        date,
        setDate,
        no,
      } as Answer);
      const returnAnswer = await this.answersService.checkAnswerId({
        id: result.id,
        userId,
      });
      return { status: HttpStatus.CREATED, data: returnAnswer };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: AnswerDto,
    description: '답변',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          format: 'string',
        },
        missionId: {
          type: 'integer',
          format: 'integer',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id',
  })
  @Put(':id')
  async put(@TokenUserId() userId, @ImageUploader('answers') body, @Id() id): Promise<AnswerDto> {
    try {
      const { file, content, missionId } = body;
      if (!file && !content) {
        throw new RequireBodyException();
      }
      const answer = await this.answersService.checkAnswerId({ id, userId });

      const imageUrl = file ? file : answer.imageUrl;
      if (!!answer.mission.isImage && !imageUrl) {
        throw new RequireFileException();
      }
      if (!!answer.mission.isContent && !content) {
        throw new RequireContentException();
      }
      const result = await this.answersService.updateAnswer({
        ...answer,
        userId,
        missionId,
        imageUrl,
        content,
      });
      const returnAnswer = await this.answersService.getAnswerByIdAndUserId({
        id: result.id,
        userId,
      });
      return { data: returnAnswer };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteAnswerDto,
    description: '답변',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id',
  })
  @Delete(':id')
  async delete(@TokenUserId() userId, @Id() id): Promise<DeleteAnswerDto> {
    try {
      const answer = await this.answersService.checkAnswerId({ id, userId });
      await this.answersService.deleteAnswer(answer);
      return { data: null, message: new DeleteAnswerDto().message };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }
}
