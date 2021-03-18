import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
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
  @ApiBearerAuth('authorization')
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'id',
  })
  @Get()
  async getAll(@Token() token, @Query('id') id): Promise<any> {
    const users = await this.usersService.getAll(id);
    return { data: users };
  }
}
