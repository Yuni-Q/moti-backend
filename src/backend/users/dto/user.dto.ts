import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { User } from 'src/backend/common/entity/User.entity';

export class UserDto extends ResponseDto {
  @ApiProperty({
    type: OmitType(User, ['answers']),
  })
  public data: User;
}
