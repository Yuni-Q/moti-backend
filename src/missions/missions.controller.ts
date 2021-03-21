import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Id } from 'src/common/decorators/id.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
import { InsufficientRefreshCount } from './dto/insufficient.refresh.count.dto';
import { MissionDto } from './dto/mission.dto';
import { MissionsDto } from './dto/missions.dto';
import { MissionsService } from './missions.service';

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
    return { status: 201, data: result };
  }
}
