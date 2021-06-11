import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { OmitUser } from 'src/backend/common/entity/User.entity';
export class UsersDto extends ResponseDto {
  @ApiProperty({
    type: OmitUser,
    isArray: true,
  })
  public data: OmitUser[];
}
