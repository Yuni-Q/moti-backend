import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { File, OmitFile } from './File.entity';
import { Mission, OmitMission } from './Mission.entity';
import { OmitUser, User } from './User.entity';

@Index('missionId', ['missionId'], {})
@Index('fileId', ['fileId'], {})
@Index('userId', ['userId'], {})
@Entity('answers', { schema: 'chocopie' })
export class Answer {
  @ApiProperty({
    example: 1,
    description: '유니크한 값입니다.',
  })
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'https://cdn.moti.company/C3EWCyEU',
    description: '이미지가 없을 경우에는 null 입니다.',
  })
  @IsString()
  @IsEmpty()
  @Column('varchar', { name: 'imageUrl', nullable: true, length: 255 })
  imageUrl: string | null;

  @ApiProperty({
    example: '답변 내용 입니다.',
    description: '답변 내용 입니다.',
  })
  @IsString()
  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @ApiProperty({
    example: '2020-02-28',
    description: '답변날짜 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'date', nullable: true, length: 255 })
  date: string | null;

  @ApiProperty({
    example: '2020-02-28',
    description: '드림캐처 묶음 기준 날짜 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'setDate', nullable: true, length: 255 })
  setDate: string | null;

  @ApiProperty({
    example: '1',
    description: '드림캐처 묶음 번호 입니다.',
  })
  @IsNumber()
  @Column('int', { name: 'no', nullable: true })
  no: number | null;

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

  @ApiProperty({
    example: '1',
    description: '답변에 연결된 미션 id 입니다.',
  })
  @IsNumber()
  @Column('int', { name: 'missionId', nullable: true })
  missionId: number | null;

  @ApiProperty({
    example: '1',
    description: '답변에 연결된 파일 id 입니다.',
  })
  @IsNumber()
  @Column('int', { name: 'fileId', nullable: true })
  fileId: number | null;

  @ApiProperty({
    example: '1',
    description: '답변에 연결된 유저 id 입니다.',
  })
  @IsNumber()
  @Column('int', { name: 'userId', nullable: true })
  userId: number | null;

  @ApiProperty({
    type: OmitMission,
  })
  @IsObject()
  @ManyToOne(() => Mission, (missions) => missions.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'missionId', referencedColumnName: 'id' }])
  mission: Mission;

  @ApiProperty({
    type: OmitFile,
  })
  @IsObject()
  @ManyToOne(() => File, (files) => files.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'fileId', referencedColumnName: 'id' }])
  file: File;

  @ApiProperty({
    type: OmitUser,
  })
  @IsObject()
  @ManyToOne(() => User, (users) => users.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
