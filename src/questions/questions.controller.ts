import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { ValidBody } from './decorators/valid.body';
import { QuestionDto } from './dto/question.dto';
import { QuestionsDto } from './dto/questions.dto';
import { QuestionsPostRequestDto } from './dto/questions.post.request.dto';
import { QuestionsService } from './questions.service';

@UseInterceptors(TransformInterceptor)
@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly QuestionsService: QuestionsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: QuestionDto,
    description: '성공',
  })
  @ApiOperation({ summary: '질문 등록' })
  @Post('')
  async post(@ValidBody() body: QuestionsPostRequestDto): Promise<QuestionDto> {
    const result = await this.QuestionsService.post(body.content);
    return { status: 201, data: result };
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
    const page = parseInt(pageString || 1, 10);
    const limit = parseInt(limitString || 1, 20);
    const result = await this.QuestionsService.get(page, limit);
    return { data: result };
  }
}
