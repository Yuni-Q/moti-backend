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
  // @UseInterceptors(TransformInterceptor)
  // getHello(): any {
  //   return { data: this.appService.getHello() };
  // }
  @Get('health')
  getHealth(): any {
    return 'OK';
  }

  @Get('error')
  error(): any {
    throw new Error('error');
  }
}