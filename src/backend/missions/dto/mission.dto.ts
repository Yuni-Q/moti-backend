import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { Mission } from 'src/backend/common/entity/Mission.entity';

export class MissionDto extends ResponseDto {
  @ApiProperty({
    type: OmitType(Mission, ['answers']),
  })
  data: Mission;
}
