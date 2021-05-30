import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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

@Entity('users', { schema: 'chocopie' })
export class User extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: '유니크한 값입니다.',
  })
  @IsNumber()
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '2020-03-18',
    description: '유저의 생일 입니다.',
  })
  @IsString({ message: 'birthday 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'birthday', nullable: true, length: 255 })
  birthday: string | null;

  @ApiProperty({
    example: 'moti@gmail.com',
    description: '유저의 이메일 입니다.',
  })
  @IsEmail()
  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @ApiProperty({
    example: '모티',
    description: '유저의 이름 입니다.',
  })
  @IsString({ message: 'name 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @ApiProperty({
    example: '남',
    description: '유저의 성별 입니다.',
  })
  @IsString({ message: 'gender 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'gender', nullable: true, length: 255 })
  gender: string | null;

  @ApiProperty({
    example: '2021-03-22',
    description: '유저의 미션 새로고침 일자 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'refreshDate', nullable: true, length: 255 })
  refreshDate: string | null;

  @ApiProperty({
    example: 'refreshToken',
    description: '유저의 refreshToken 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'refreshToken', nullable: true, length: 255 })
  refreshToken: string | null;

  @ApiProperty({
    example: '12412412512',
    description: '유저의 snsId와 snsType 값의 합은 유니한 값 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'snsId', nullable: true, length: 255 })
  @IsNotEmpty()
  snsId: string | null;

  @ApiProperty({
    example: 'apple',
    description: '유저의 snsId와 snsType 값의 합은 유니한 값 입니다.',
  })
  @Column('varchar', { name: 'snsType', nullable: true, length: 255 })
  snsType: string | null;

  @ApiProperty({
    example: 'https://cdn.moti.company/J9smJXN7',
    description: '유저의 프로필 이미지 주소 입니다.',
  })
  @IsString()
  @Column('varchar', { name: 'profileUrl', nullable: true, length: 255 })
  profileUrl: string | null;

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
    example: '2020-02-28 00:08:15',
    description: '유저에게 할당 된 미션 입니다.',
  })
  @IsString()
  @Column('text', { name: 'mission', nullable: true })
  mission: string | null;

  @ApiProperty({
    type: Answer,
    isArray: true,
  })
  @OneToMany(() => Answer, (answers) => answers.user)
  answers: Answer[];
}
