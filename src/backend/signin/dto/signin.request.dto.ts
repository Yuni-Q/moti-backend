import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninRequestDto {
  @ApiProperty({
    example: 'apple',
    description: 'sns type',
    required: true,
  })
  @IsString({ message: '필수 파라이터가 없습니다.' })
  @IsNotEmpty({ message: '필수 파라이터가 없습니다.' })
  public snsType: string;
}
