import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomInternalServerErrorException } from 'src/common/exception/custom.interval.server.error.exception';
import { InvalidQueryException } from 'src/common/exception/invalid.query.exception';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { ValidBody } from './decorators/valid.body';
import { QuestionDto } from './dto/question.dto';
import { QuestionsDto } from './dto/questions.dto';
import { QuestionsPostRequestDto } from './dto/questions.post.request.dto';
import { QuestionsService } from './questions.service';

@UseInterceptors(TransformInterceptor)
@ApiTags('questions')
@Controller('api/v1/questions')
export class QuestionsController {
  constructor(private readonly QuestionsService: QuestionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: QuestionDto,
    description: '성공',
  })
  @ApiOperation({ summary: '질문 등록' })
  @Post('')
  async post(@ValidBody() body: QuestionsPostRequestDto): Promise<QuestionDto> {
    try {
      const result = await this.QuestionsService.createQuestion(body.content);
      return { status: HttpStatus.CREATED, data: result };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: QuestionsDto,
    description: '성공',
  })
  @ApiQuery({ name: 'page', required: false, description: 'page' })
  @ApiQuery({ name: 'limit', required: false, description: 'limit' })
  @ApiOperation({ summary: '질문 조회' })
  @Get('')
  async get(
    @Query('page') pageString,
    @Query('limit') limitString,
  ): Promise<QuestionsDto> {
    try {
      const page = parseInt(pageString || 1, 10);
      const limit = parseInt(limitString || 1, 10);
      if (isNaN(page) || isNaN(limit)) {
        throw new InvalidQueryException();
      }
      let skip = 0;
      if (page > 1) {
        skip = limit * (page - 1);
      }
      const result = await this.QuestionsService.getQuestions({
        skip,
        take: limit,
      });
      return { data: result };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }
}
