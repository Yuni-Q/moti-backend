import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
import { RequireTokenDto } from 'src/common/dto/require.token.dto';
import { TransformInterceptor } from 'src/common/interceptors/transformInterceptor.interceptor';
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
}
