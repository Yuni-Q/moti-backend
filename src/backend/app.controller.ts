import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UndefinedToNullInterceptor } from './common/interceptors/undefined.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('참고')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): any {
  //   try {
  //     throw new InvalidQueryException();
  //   } catch (e) {
  //     return 'OK';
  //     throw new HttpException('No', 400);
  //   }
  // }.

  @Get('health')
  getHealth(): any {
    return 'OK';
  }

  // @Get('error')
  // error(): any {
  //   throw new Error('error');
  // }
}
