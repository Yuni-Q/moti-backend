import { ApiProperty, OmitType } from '@nestjs/swagger';
import { isArray, IsNumber, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from './Answer.entity';

@Entity('files', { schema: 'chocopie' })
export class File extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: '유니크한 값입니다.',
  })
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'https://cdn.moti.company/J9smJXN7.pdf',
    description: '드림캐처 파츠의 pdf 이미지 주소 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'cardUrl', nullable: true, length: 255 })
  cardUrl: string | null;

  @ApiProperty({
    example: 'https://cdn.moti.company/J9smJXN7.svg',
    description: '드림캐처 파츠의 svg 이미지 주소 입니다.',
  })
  @Column('varchar', { name: 'cardSvgUrl', nullable: true, length: 255 })
  cardSvgUrl: string | null;

  @ApiProperty({
    example: 'https://cdn.moti.company/J9smJXN7.png',
    description: '드림캐처 파츠의 png 이미지 주소 입니다.',
  })
  @Column('varchar', { name: 'cardPngUrl', nullable: true, length: 255 })
  cardPngUrl: string | null;

  @ApiProperty({
    example: '1',
    description: '드림캐처 파츠의 구분 번호 입니다.',
  })
  @IsNumber()
  @Column('int', { name: 'part', nullable: true })
  part: number | null;

  @ApiProperty({
    example: '2020-02-28 00:08:15',
    description: '데이터 생성일 입니다.',
  })
  @IsString()
  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: '2020-02-28 00:08:15',
    description: '데이터 수정일 입니다.',
  })
  @IsString()
  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  updatedAt: Date;

  // @ApiProperty({
  //   type: Answer,
  //   isArray: true,
  // })
  @OneToMany(() => Answer, (answers) => answers.file)
  answers: Answer[];
}
