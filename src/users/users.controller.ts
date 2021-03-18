import {
  Controller,
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
import { Token } from 'src/common/decorators/token.decorator';
import { InvalidBodyDto } from 'src/common/dto/invalid.body.dto';
import { TokenDto } from 'src/common/dto/token.dto';
import { User } from 'src/common/entity/User.entity';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { ValidBody } from './decorators/valid.body';
import { BodyDto } from './dto/body.dto';
import { UserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('authorization')
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  type: TokenDto,
  description: '토큰이 필요합니다.',
})
@ApiTags('users')
@Controller('users')
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
    @Token() user: User,
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
  async getMyInfo(@Token() user: User): Promise<UserDto> {
    const my = await this.usersService.get(user.id);
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
  async getUserInfo(@Token() user: User, @Id() id: number): Promise<UserDto> {
    const my = await this.usersService.get(id);
    return { data: my };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: '성공',
  })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    type: InvalidBodyDto,
    description: '필수 파라이터가 없습니다.',
  })
  @ApiBody({
    type: BodyDto,
    required: true,
    description: 'body',
  })
  @ApiOperation({ summary: '내 정보 수정' })
  @Put('')
  async updateUser(
    @Token() user: User,
    @ValidBody() body: BodyDto,
  ): Promise<UserDto> {
    const my = await this.usersService.updateMyInfo(user.id, body);
    return { data: my };
  }
}
