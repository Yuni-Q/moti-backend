import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('questions', { schema: 'chocopie' })
export class Question {
  @ApiProperty({
    example: 1,
    description: '유니크한 값 입니다.',
  })
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '내용입니다.',
    description: '질문 내용 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'content', nullable: true, length: 255 })
  content: string | null;

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
}
