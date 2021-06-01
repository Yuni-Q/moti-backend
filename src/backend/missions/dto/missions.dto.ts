import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Mission } from 'src/backend/common/entity/Mission.entity';

class Missions {
  @ApiProperty({
    example: true,
    description: '미션 갱신 가능 여부',
  })
  refresh: boolean;
  @ApiProperty({
    type: OmitType(Mission, ['answers']),
    isArray: true,
  })
  missions: Mission[];
}

export class MissionsDto extends ResponseDto {
  @ApiProperty({
    type: Missions,
  })
  data: Missions;
}
