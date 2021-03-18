import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
import { SampleRequestDto } from 'src/dto/sample.request.dto';
import { TokenDto } from 'src/dto/token.dto';
import { TransformInterceptor } from 'src/interceptors/transformInterceptor.interceptor';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@UseInterceptors(TransformInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    type: UsersDto,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    type: TokenDto,
    description: '토큰이 필요합니다.',
  })
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'token',
  })
  @Get()
  async find(@Token() token): Promise<any> {
    const users = await this.usersService.find();
    return { data: users };
  }
}
