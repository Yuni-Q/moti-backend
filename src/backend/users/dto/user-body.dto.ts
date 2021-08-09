import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// export class UserBodyDto extends PickType(User, [
//   'name',
//   'birthday',
//   'gender',
// ]) {}

export class UserBodyDto {
  @IsString({ message: '파라미터가 올바르지 않습니다.' })
  @IsNotEmpty({ message: '필수 파라이터가 없습니다.' })
  @ApiProperty({
    example: '모티',
    description: '이름',
    required: true,
  })
  public name: string;

  @IsString({ message: '파라미터가 올바르지 않습니다.' })
  @ApiProperty({
    example: '2020-03-18',
    description: '생일',
    required: true,
  })
  public birthday: string;

  @IsString({ message: '파라미터가 올바르지 않습니다.' })
  @ApiProperty({
    example: '남',
    description: '성별',
    required: true,
  })
  public gender: string;
}
