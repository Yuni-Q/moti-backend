import { ApiProperty } from '@nestjs/swagger';

export class SigninRequestDto {
  @ApiProperty({
    example: 'apple',
    description: 'sns type',
    required: true,
  })
  public snsType: string;
}
