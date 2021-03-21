import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';
import { Answer } from 'src/common/entity/Answer.entity';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { AnswersService } from './answers.service';
import { AnswerDto } from './dto/answer.dto';
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
  constructor(private readonly answersService: AnswersService) {}

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
}
