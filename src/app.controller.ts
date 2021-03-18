import { Body, Controller, Get, UseInterceptors } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { Token } from './common/decorators/token.decorator';
import { SampleRequestDto } from './dto/sample.request.dto';
import { TransformInterceptor } from './interceptors/transformInterceptor.interceptor';
import { UndefinedToNullInterceptor } from './interceptors/undefined.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('참고')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  getHello(): any {
    return { data: this.appService.getHello() };
  }

  @ApiResponse({
    status: 200,
    type: SampleRequestDto,
    description: '성공',
  })
  @ApiResponse({
    status: 500,
    type: SampleRequestDto,
    description: '에러',
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '쿼리 사용하기',
  })
  @ApiParam({
    name: 'url',
    required: true,
    description: 'path',
  })
  @ApiOperation({ summary: 'hi' })
  @Get('hi')
  getHi(@Body() body: SampleRequestDto, @Token() token): any {
    return { data: 'bye' };
  }
}
