import { ApiProperty, OmitType } from '@nestjs/swagger';
import { isArray } from 'class-validator';
import { ResponseDto } from 'src/backend/common/dto/response.dto';
import { User } from 'src/backend/common/entity/User.entity';

export class UsersDto extends ResponseDto {
  @ApiProperty({
    type: OmitType(User, ['answers']),
    isArray: true,
  })
  public data: User[];
}
