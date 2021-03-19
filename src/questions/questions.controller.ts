import { Controller, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Question } from 'src/common/entity/Question.entity';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { ValidBody } from './decorators/valid.body';
import { QuestionDto } from './dto/question.dto';
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
}
