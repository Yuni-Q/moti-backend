import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
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

@Entity('missions', { schema: 'chocopie' })
export class Mission extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: '유니크한 값입니다.',
  })
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '질문',
    description: '질문 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @ApiProperty({
    example: 'true',
    description: '질문에 내용이 필수인지 입니다.',
  })
  @IsBoolean()
  @Column()
  isContent: boolean | null;

  @ApiProperty({
    example: 'true',
    description: '질문에 이미지가 필수인지 입니다.',
  })
  @IsBoolean()
  @Column()
  isImage: boolean | null;

  @ApiProperty({
    example: '30',
    description: '질문의 최소 반복 주기 입니다.',
  })
  @IsNumber()
  @Column('int', { name: 'cycle', nullable: true })
  cycle: number | null;

  @ApiProperty({
    example: '2020-02-28 00:08:15',
    description: '데이터 생성일 입니다.',
  })
  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: '2020-02-28 00:08:15',
    description: '데이터 수정일 입니다.',
  })
  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  updatedAt: Date;

  // @ApiProperty({
  //   type: Answer,
  //   isArray: true,
  // })
  @OneToMany(() => Answer, (answers) => answers.mission)
  answers: Answer[];
}
