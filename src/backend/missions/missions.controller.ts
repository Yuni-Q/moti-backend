import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnswersService } from 'src/backend/answers/answers.service';
import { Id } from 'src/backend/common/decorators/id.decorator';
import { TokenUserId } from 'src/backend/common/decorators/token-user-id.decorator';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { CustomInternalServerErrorException } from 'src/backend/common/exception/custom.interval.server.error.exception';
import { RequireBodyException } from 'src/backend/common/exception/require.body.exception';
import { RequireTokenException } from 'src/backend/common/exception/require.token.exception';
import { TransformInterceptor } from 'src/backend/common/interceptors/transformInterceptor.interceptor';
import { getDateString } from 'src/backend/common/util/date';
import { UsersService } from 'src/backend/users/users.service';
import { LoginGuard } from '../common/guard/login.guard';
import { DeleteMissionDto } from './dto/delete-mission.dto';
import { MissionBodyDto } from './dto/mission-body.dto';
import { MissionDto } from './dto/mission.dto';
import { MissionsDto } from './dto/missions.dto';
import { InsufficientRefreshCountException } from './exception/insufficient-refresh-count.exception';
import { InvalidMissionIdException } from './exception/invalid-mission-id.exception';
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
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    type: MissionsDto,
    description: '성공',
  })
  @Get()
  async missions(@TokenUserId() userId): Promise<MissionsDto> {
    try {
      const date = getDateString({});
      const user = await this.usersService.checkUser({ id: userId });
      const mission = this.missionsService.getOldMission({
        mission: user.mission,
      });
      const refresh = this.missionsService.isRefresh({ user, date });
      if (this.missionsService.hasOldMissions({ mission, date })) {
        return {
          data: { refresh, missions: mission.missions },
        };
      }
      const oneYearAgo = getDateString({ date, years: -1 });
      const missions = await this.getNewMission({ date, userId, oneYearAgo });
      const newUser = { ...user, mission: JSON.stringify({ date, missions }) };
      await this.usersService.updateUser(newUser);
      return { data: { refresh, missions } };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: MissionsDto,
    description: '성공',
  })
  @ApiResponse({
    status: new InsufficientRefreshCountException().statusCode,
    type: InsufficientRefreshCountException,
    description: new InsufficientRefreshCountException().message,
  })
  @Get('refresh')
  async refresh(@TokenUserId() userId): Promise<MissionsDto> {
    try {
      const user = await this.usersService.checkUser({ id: userId });
      const date = getDateString({});
      if (this.missionsService.hasRefresh({ user, date })) {
        throw new InsufficientRefreshCountException();
      }
      const oneYearAgo = getDateString({ date, years: -1 });
      const missions = await this.getNewMission({ date, userId, oneYearAgo });
      const newUser = {
        ...user,
        refreshDate: date,
        mission: JSON.stringify({ date, missions }),
      };
      await this.usersService.updateUser(newUser);
      return { status: HttpStatus.OK, data: { refresh: false, missions } };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
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
  async mission(@TokenUserId() userId, @Id() id): Promise<MissionDto> {
    try {
      const mission = await this.missionsService.getMissionById({ id });
      return { data: mission };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
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
  @UseGuards(LoginGuard)
  @Post()
  async create(
    @Body() body: MissionBodyDto,
  ): Promise<MissionDto> {
    try {
      const mission = await this.missionsService.createMission(body);
      return { status: HttpStatus.CREATED, data: mission };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MissionsDto,
    description: '성공',
  })
  @ApiResponse({
    status: new InvalidMissionIdException().statusCode,
    type: InvalidMissionIdException,
    description: new InvalidMissionIdException().message,
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
  @UseGuards(LoginGuard)
  @Put(':id')
  async update(
    @Body() body: MissionBodyDto,
    @Id() id,
  ): Promise<MissionDto> {
    try {
      const mission = await this.missionsService.checkMission({ id });
      const newMission = { ...mission, ...body };
      const returnMission = await this.missionsService.updateMission(
        newMission,
      );
      return { data: returnMission };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  @ApiResponse({
    status: new InvalidMissionIdException().statusCode,
    type: InvalidMissionIdException,
    description: new InvalidMissionIdException().message,
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
  async destroy(@TokenUserId() userId, @Id() id): Promise<DeleteMissionDto> {
    try {
      const mission = await this.missionsService.checkMission({ id });
      await this.missionsService.deleteMission(mission);
      return { data: null };
    } catch (error) {
      throw new CustomInternalServerErrorException(error.message, error.status, error.statusCode);
    }
  }

  async getNewMission({
    oneYearAgo,
    date,
    userId,
  }: {
    oneYearAgo: string;
    date: string;
    userId: number;
  }) {
    const oneYearData =
      await this.answersService.getAnswersByUserIdAndDateRange({
        userId,
        dateGt: oneYearAgo,
      });
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
