import {
  Controller,
  Get,
  Param,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UndefinedToNullInterceptor } from './common/interceptors/undefined.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('참고')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // getHello(): any {
  //   try {
  //     throw new InvalidQueryException();
  //   } catch (e) {
  //     return 'OK';
  //     throw new HttpException('No', 400);
  //   }
  // }.

  
   /**
   * 테스트
   * @param page 페이지(1~). 기본값: 1
   * @param limit 페이지 당 엔티티 수. 기본값 10
   */
  @Get('health')
  getHealth(@Param('page') page, @Param('limit') limit): any {
    return 'OK';
  }

  // @Get('error')
  // error(): any {
  //   throw new Error('error');
  // }
}
