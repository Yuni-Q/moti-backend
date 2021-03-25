import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnswersService } from 'src/answers/answers.service';
import { Id } from 'src/common/decorators/id.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { Answer } from 'src/common/entity/Answer.entity';
import { RequireBodyException } from 'src/common/exception/require.body.exception';
import { RequireTokenException } from 'src/common/exception/require.token.exception';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { getDateString } from 'src/common/util/date';
import { UsersService } from 'src/users/users.service';
import { ValidBody } from './decorators/valid.body';
import { DeleteMissionDto } from './dto/delete.mission.dto';
import { InsufficientRefreshCount } from './dto/insufficient.refresh.count.dto';
import { InvalidMissionIdDto } from './dto/invalid.mission.id.dto';
import { MissionBodyDto } from './dto/mission.body.dto';
import { MissionDto } from './dto/mission.dto';
import { MissionsDto } from './dto/missions.dto';
import { MissionsService } from './missions.service';

@ApiResponse({
  status: new RequireTokenException().statusCode,
  type: RequireTokenException,
  description: new RequireTokenException().message,
})
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('authorization')
@ApiTags('missions')
@Controller('api/v1/missions')
export class MissionsController {
  constructor(
    private readonly missionsService: MissionsService,
    private readonly answersService: AnswersService,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: MissionsDto,
    description: '성공',
  })
  @Get()
  async missions(@Token() { id }): Promise<MissionsDto> {
    try {
      const user = await this.usersService.checkUser(id);
      const oldMission = this.missionsService.getOldMission(user);
      const refresh = this.missionsService.isRefresh(user);
      if (this.missionsService.hasOldMissions(oldMission)) {
        return {
          status: HttpStatus.OK,
          data: { refresh, missions: oldMission.missions },
        };
      }
      const missions = await this.getNewMission(id);
      await this.usersService.setMissionsInUser({ missions, id: id });
      return { status: HttpStatus.OK, data: { refresh, missions } };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: MissionsDto,
    description: '성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: InsufficientRefreshCount,
    description: '갱신 횟수가 모자랍니다.',
  })
  @Get('refresh')
  async refresh(@Token() { id }): Promise<MissionsDto> {
    try {
      const user = await this.usersService.checkUser(id);
      if (this.missionsService.hasRefresh(user)) {
        throw new HttpException(
          new InsufficientRefreshCount(),
          HttpStatus.BAD_REQUEST,
        );
      }
      const missions = await this.getNewMission(id);
      await this.usersService.setMissionsAndRefreshDateInUser({
        missions,
        id: id,
      });
      return { status: HttpStatus.OK, data: { refresh: false, missions } };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MissionsDto,
    description: '성공',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'path',
  })
  @Get(':id')
  async mission(@Token() user, @Id() id): Promise<MissionDto> {
    const result = await this.missionsService.findOne(id);
    return { data: result };
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MissionsDto,
    description: '성공',
  })
  @ApiBody({
    type: MissionBodyDto,
    required: true,
    description: 'body',
  })
  @Post()
  async create(@Token() user, @ValidBody() body): Promise<MissionDto> {
    const result = await this.missionsService.create(body);
    return { status: 201, data: result };
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MissionsDto,
    description: '성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: InvalidMissionIdDto,
    description: '성공',
  })
  @ApiResponse({
    status: new RequireBodyException().statusCode,
    type: RequireBodyException,
    description: new RequireBodyException().message,
  })
  @ApiBody({
    type: MissionBodyDto,
    required: true,
    description: 'body',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'path',
  })
  @Put(':id')
  async update(
    @Token() user,
    @ValidBody() body,
    @Id() id,
  ): Promise<MissionDto> {
    const result = await this.missionsService.update(id, body);
    return { data: result };
  }

  @ApiResponse({
    status: new InvalidMissionIdDto().status,
    type: InvalidMissionIdDto,
    description: new InvalidMissionIdDto().message,
  })
  @ApiResponse({
    status: new DeleteMissionDto().status,
    type: DeleteMissionDto,
    description: new DeleteMissionDto().message,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'path',
  })
  @Delete(':id')
  async destroy(@Token() user, @Id() id): Promise<DeleteMissionDto> {
    const result = await this.missionsService.destroy(id);
    return { data: result };
  }

  async getNewMission(userId: number) {
    const date = getDateString({});
    const oneYearAgo = getDateString({ years: -1 });
    const oneYearData = await this.answersService.getAnswersByUserIdAndDateRange(
      {
        userId,
        dateGt: oneYearAgo,
      },
    );
    const ids = [] as number[];
    oneYearData.forEach((answer: Answer) => {
      if (this.missionsService.hasMissionInAnswer({ answer, date })) {
        ids.push(answer.mission.id);
      }
    });
    const missions = this.missionsService.getMissionsByNotInIdAndLimit({ ids });
    return missions;
  }
}
