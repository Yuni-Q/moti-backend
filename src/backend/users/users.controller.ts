import {
  Body,
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
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Id } from 'src/backend/common/decorators/id.decorator';
import { TokenUserId } from 'src/backend/common/decorators/token-user-id.decorator';
import { User } from 'src/backend/common/entity/User.entity';
import { CustomInternalServerErrorException } from 'src/backend/common/exception/custom.interval.server.error.exception';
import { RequireBodyException } from 'src/backend/common/exception/require.body.exception';
import { RequireTokenException } from 'src/backend/common/exception/require.token.exception';
import { TransformInterceptor } from 'src/backend/common/interceptors/transformInterceptor.interceptor';
import { ImageUploader } from '../common/decorators/image-uploader.decorator';
import { QueryNumberValidationPipe } from '../common/pipe/query-number.validation.pipe';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserBodyDto } from './dto/user-body.dto';
import { UserDto } from './dto/user.dto';
import { UsersDto } from './dto/users.dto';
import { InvalidUserIdException } from './exception/invalid-user-id.dto';
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
  constructor(private readonly usersService: UsersService) { }

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
    @Query('id', new QueryNumberValidationPipe(10)) id,
  ): Promise<UsersDto> {
    try {
      const users = await this.usersService.getAll(id);
      return { data: users };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }

  @ApiResponse({
    status: 200,
    type: UserDto,
    description: '성공',
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get('my')
  async getMyInfo(@TokenUserId() userId): Promise<UserDto> {
    try {
      const user = await this.usersService.getUserById({ id: userId });
      return { data: user };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
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
    // @Param(
    //   'id',
    //   new ParseIntPipe({
    //     exceptionFactory: (err) => {
    //       throw new RequireIdException();
    //     },
    //   }),
    // )
    // id: number,
    @Id() id: number,
  ): Promise<UserDto> {
    try {
      const user = await this.usersService.getUserById({ id });
      return { data: user };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: '성공',
  })
  @ApiResponse({
    status: new InvalidUserIdException().statusCode,
    type: InvalidUserIdException,
    description: new InvalidUserIdException().message,
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
    @Body() body: UserBodyDto,
  ): Promise<UserDto> {
    try {
      const user = await this.usersService.checkUser({ id: userId });
      const newUser = { ...user, ...body };
      const returnUser = await this.usersService.updateMyInfo(newUser);
      return { data: returnUser };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: '성공',
  })
  @ApiResponse({
    status: new InvalidUserIdException().statusCode,
    type: InvalidUserIdException,
    description: new InvalidUserIdException().message,
  })
  @ApiOperation({ summary: 'refreshDate 초기화' })
  @Put('refresh')
  async resetRefreshDate(@TokenUserId() userId): Promise<UserDto> {
    try {
      const user = await this.usersService.checkUser({ id: userId });
      const newUser = { ...user, refreshDate: null };
      const returnUser = await this.usersService.updateMyInfo(newUser);
      return { data: returnUser };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DeleteUserDto,
    description: '성공',
  })
  @ApiResponse({
    status: new InvalidUserIdException().statusCode,
    type: InvalidUserIdException,
    description: new InvalidUserIdException().message,
  })
  @ApiOperation({ summary: '유저 삭제' })
  @Delete('')
  async deleteUser(@TokenUserId() userId): Promise<DeleteUserDto> {
    try {
      const user = await this.usersService.checkUser({ id: userId });
      await this.usersService.deleteUser(user);
      return { data: null };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto,
    description: '프로필 필드 변경 성공',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: new InvalidUserIdException().statusCode,
    type: InvalidUserIdException,
    description: new InvalidUserIdException().message,
  })
  @ApiOperation({ summary: '프로필 이미지 업로드' })
  @Put('my/profile')
  async updateProfileUrl(
    @TokenUserId() userId,
    @ImageUploader('profile') body,
  ): Promise<UserDto> {
    try {
      const { file: profileUrl } = body;
      const user = await this.usersService.checkUser({ id: userId });
      const newUser = { ...user, profileUrl: profileUrl };
      const returnUser = await this.usersService.updateMyInfo(newUser);
      return { data: returnUser };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message);
    }
  }
}
