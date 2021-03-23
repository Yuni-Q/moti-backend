import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Id } from 'src/common/decorators/id.decorator';
import { ImageUploader } from 'src/common/decorators/image.uploader.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { RequireBodyDto } from 'src/common/dto/require.body.dto';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';
import { Answer } from 'src/common/entity/Answer.entity';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { getDateString } from 'src/common/util/date';
import { FilesService } from 'src/files/files.service';
import { MissionsService } from 'src/missions/missions.service';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';
import { AnswersDto } from './dto/answers.dto';
import { DeleteAnswerDto } from './dto/delete.answer.dto';
import { DiaryAnswersDto } from './dto/diary.answers.dto';
import { ListAnswersDto } from './dto/list.answers.dto';
import { MonthAnswersDto } from './dto/month.answers.dto';
import { WeekAnswerDto } from './dto/week.answer.dto';

@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  type: RequireTokenDto,
  description: '토큰이 필요합니다.',
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
    type: AnswerDto,
    description: '성공',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    description: '특정 날짜의 답변',
  })
  @Get()
  async date(@Token() user, @Query('date') date): Promise<AnswerDto> {
    try {
      const userId = user.id;
      const answer = date
        ? await this.answersService.getAnswerByDateAndUserId({ userId, date })
        : await this.answersService.getAnswerByUserId({ userId });
      return { data: answer };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: WeekAnswerDto,
    description: '최근 답변 리스트',
  })
  @Get('week')
  async week(@Token() user): Promise<WeekAnswerDto> {
    try {
      const userId = user.id;
      const answer = await this.answersService.getAnswerByUserId({ userId });
      const recentAnswers: Answer[] =
        answer && answer.setDate
          ? await this.answersService.getRecentAnswers({
              userId,
              setDate: answer.setDate,
            })
          : [];
      // 6개의 파츠를 모두 모은 날이 오늘이 아니면 새로운 것을 준다
      const newAnswers =
        !!recentAnswers &&
        !this.answersService.hasSixParsAndNotToday(recentAnswers)
          ? recentAnswers
          : [];
      const today = getDateString({});
      return { data: { today, answers: newAnswers } };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DiaryAnswersDto,
    description: '일기 형식으로 답변 조회',
  })
  @ApiQuery({
    name: 'lastId',
    required: false,
    description: 'lastId',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'limit',
  })
  @ApiQuery({
    name: 'direction',
    required: false,
    description: 'direction',
  })
  @Get('diary')
  async diary(
    @Token() user,
    @Query('lastId') lastIdString,
    @Query('limit') limitString,
    @Query('direction') directionString,
  ): Promise<DiaryAnswersDto> {
    try {
      const lastId = parseInt(lastIdString, 10);
      const limit = parseInt(limitString || 100, 10);
      const direction = parseInt(directionString || 0, 10);
      const userId = user.id;
      const answers = lastId
        ? await this.answersService.getAnswersDiaryByLastId({
            userId,
            lastId,
            limit,
            direction,
          })
        : await await this.answersService.getAnswersDiary({ userId, limit });
      return { data: { lastId, limit, direction, answers } };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
  async list(
    @Token() user,
    @Query('answerId') answerId,
  ): Promise<ListAnswersDto> {
    try {
      const userId = user.id;
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
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
  async listId(@Token() user, @Id() id): Promise<AnswersDto> {
    const result = await this.answersService.listId(id, user.id);
    return { data: result };
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
  async month(@Token() user, @Query('date') date): Promise<MonthAnswersDto> {
    const result = await this.answersService.month(user.id, date);
    return { data: result };
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
  async get(@Token() user, @Id() id): Promise<AnswerDto> {
    const result = await this.answersService.get(id, user.id);
    return { data: result };
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
  async post(@Token() user, @ImageUploader() body): Promise<AnswerDto> {
    const userId = user.id;
    const { file: imageUrl, content, missionId } = body;
    if ((!imageUrl && !content) || !missionId) {
      throw new HttpException(
        new RequireBodyDto(),
        new RequireBodyDto().status,
      );
    }
    await this.answersService.existAnswerByDateAndUserId(userId);

    const lastAnswer = await this.answersService.getAnswerByUserId({ userId });
    // 데이터가 있어야 무언가를 할수가...
    const recentAnswers: Answer[] = this.answersService.hasSetDate(lastAnswer)
      ? await this.answersService.getRecentAnswers({
          userId,
          setDate: lastAnswer?.setDate as string,
        })
      : [];
    // 6개의 파츠를 모두 모았다면 새로운 파츠를 시작한다.
    const setDate = this.answersService.getSetDate(recentAnswers);
    const no = this.answersService.getNo(recentAnswers);
    const partNumber = this.answersService.getPartNumber(recentAnswers);
    const cardFile = await this.filesService.getFileByPart(partNumber);
    const { id: fileId = 1 } = cardFile;
    const mission = await this.missionsService.checkMission(missionId);
    if (!!mission?.isImage && !imageUrl) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'file이 필요한 미션 입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!!mission?.isContent && !content) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'content가 필요한 미션 입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const date = getDateString({});
    const result = await this.answersService.create(user.id, {
      userId,
      missionId,
      imageUrl,
      fileId,
      content,
      date,
      setDate,
      no,
    } as Answer);
    const answer = await this.answersService.checkAnswerId(result.id, userId);
    return { status: HttpStatus.CREATED, data: answer };
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
  async put(
    @Token() user,
    @ImageUploader() body,
    @Id() id,
  ): Promise<AnswerDto> {
    const userId = user.id;
    const { file, content, missionId } = body;
    if (!file && !content) {
      throw new HttpException(
        new RequireBodyDto(),
        new RequireBodyDto().status,
      );
    }
    const answer = await this.answersService.checkAnswerId(id, userId);

    const imageUrl = file ? file : answer.imageUrl;
    if (!!answer.mission.isImage && !imageUrl) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'file이 필요한 미션 입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!!answer.mission.isContent && !content) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'content가 필요한 미션 입니다.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.answersService.updateAnswer({
      ...answer,
      userId,
      missionId,
      imageUrl,
      content,
    });
    const returnAnswer = await this.answersService.get(result.id, userId);
    return { data: returnAnswer };
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
  async delete(@Token() user, @Id() id): Promise<DeleteAnswerDto> {
    const answer = await this.answersService.checkAnswerId(id, user.id);
    await this.answersService.destroy(answer);
    return { data: null, message: new DeleteAnswerDto().message };
  }
}
