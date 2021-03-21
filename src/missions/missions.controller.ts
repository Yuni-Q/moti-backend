import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Id } from 'src/common/decorators/id.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { ValidBody } from './decorators/valid.body';
import { MissionBodyDto } from './dto/mission.body.dto';
import { InsufficientRefreshCount } from './dto/insufficient.refresh.count.dto';
import { MissionDto } from './dto/mission.dto';
import { MissionsDto } from './dto/missions.dto';
import { MissionsService } from './missions.service';
import { InvalidMissionIdDto } from './dto/invalid.mission.id.dto';
import { RequireBodyDto } from 'src/common/dto/require.body.dto';
import { DeleteMissionDto } from './dto/delete.mission.dto';

@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  type: RequireTokenDto,
  description: '토큰이 필요합니다.',
})
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth('authorization')
@ApiTags('missions')
@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MissionsDto,
    description: '성공',
  })
  @Get()
  async missions(@Token() user): Promise<MissionsDto> {
    const result = await this.missionsService.getAll(user.id);
    return { status: 201, data: result };
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MissionsDto,
    description: '성공',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: InsufficientRefreshCount,
    description: '갱신 횟수가 모자랍니다.',
  })
  @Get('refresh')
  async refresh(@Token() user): Promise<MissionsDto> {
    const result = await this.missionsService.refresh(user.id);
    return { status: 201, data: result };
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
    status: new RequireBodyDto().status,
    type: RequireBodyDto,
    description: new RequireBodyDto().message,
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
}
