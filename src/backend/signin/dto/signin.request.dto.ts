import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninRequestDto {
  @ApiProperty({
    example: 'apple',
    description: 'sns type',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  public snsType: string;
}
