import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Id } from 'src/common/decorators/id.decorator';
import { TokenUserId } from 'src/common/decorators/token.user.id.decorator';
import { User } from 'src/common/entity/User.entity';
import { RequireBodyException } from 'src/common/exception/require.body.exception';
import { RequireTokenException } from 'src/common/exception/require.token.exception';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { ValidBody } from './decorators/valid.body';
import { DeleteUserDto } from './dto/delete.user.dto';
import { InvalidUserIdDto } from './dto/invalid.user.id.dto';
import { UserBodyDto } from './dto/user.body.dto';
import { UserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('authorization')
@ApiResponse({
  status: new RequireTokenException().statusCode,
  type: RequireTokenException,
  description: new RequireTokenException().message,
})
@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: UsersDto,
    description: '성공',
  })
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'id',
  })
  @Get()
  async getAll(
    @TokenUserId() userId: User,
    @Query('id') id: string,
  ): Promise<UsersDto> {
    const users = await this.usersService.getAll(id);
    return { data: users };
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
    description: '성공',
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get('my')
  async getMyInfo(@TokenUserId() userId): Promise<UserDto> {
    const my = await this.usersService.get(userId);
    return { data: my };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: '성공',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'path',
  })
  @ApiOperation({ summary: '특정 정보 조회' })
  @Get(':id')
  async getUserInfo(
    @TokenUserId() userId: User,
    @Id() id: number,
  ): Promise<UserDto> {
    const my = await this.usersService.get(id);
    return { data: my };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: '성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: InvalidUserIdDto,
    description: '유저가 없습니다.',
  })
  @ApiResponse({
    status: new RequireBodyException().statusCode,
    type: RequireBodyException,
    description: new RequireBodyException().message,
  })
  @ApiBody({
    type: UserBodyDto,
    required: true,
    description: 'body',
  })
  @ApiOperation({ summary: '내 정보 수정' })
  @Put('')
  async updateUser(
    @TokenUserId() userId,
    @ValidBody() body: UserBodyDto,
  ): Promise<UserDto> {
    const my = await this.usersService.updateMyInfo(userId, body);
    return { data: my };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: '성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: InvalidUserIdDto,
    description: '유저가 없습니다.',
  })
  @ApiOperation({ summary: 'refreshDate 초기화' })
  @Put('refresh')
  async resetRefreshDate(@TokenUserId() userId): Promise<UserDto> {
    const my = await this.usersService.updateMyInfo(userId, {
      refreshDate: null,
    });
    return { data: my };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteUserDto,
    description: '성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: InvalidUserIdDto,
    description: '유저가 없습니다.',
  })
  @ApiOperation({ summary: '유저 삭제' })
  @Delete('')
  async deleteUser(@TokenUserId() userId): Promise<DeleteUserDto> {
    const result = await this.usersService.deleteUser(userId);
    return { data: result };
  }
}
