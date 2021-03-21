import {
  Controller,
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
@Controller('answers')
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
    const result = await this.answersService.date(user.id, date);
    return { data: result };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: WeekAnswerDto,
    description: '최근 답변 리스트',
  })
  @Get('week')
  async week(@Token() user): Promise<WeekAnswerDto> {
    const result = await this.answersService.week(user.id);
    return { data: result };
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
    const result = await this.answersService.list(user.id, answerId);
    return { data: result };
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
    return { status: HttpStatus.CREATED, data: result };
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
    if ((!file && !content) || !missionId) {
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
}
