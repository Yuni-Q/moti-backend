import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: '2020-03-18',
    description: '생일',
    required: true,
  })
  @Column('varchar', { name: 'birthday', nullable: true, length: 255 })
  @IsString({ message: 'birthday 값이 올바르지 않습니다.' })
  birthday: string | null;

  @IsEmail()
  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @ApiProperty({
    example: '모티',
    description: '이름',
    required: true,
  })
  @IsString({ message: 'name 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @ApiProperty({
    example: '남',
    description: '성별',
    required: true,
  })
  @IsString({ message: 'gender 값이 올바르지 않습니다.' })
  @Column('varchar', { name: 'gender', nullable: true, length: 255 })
  gender: string | null;

  @Column('varchar', { name: 'refreshDate', nullable: true, length: 255 })
  refreshDate: string | null;

  @Column('varchar', { name: 'refreshToken', nullable: true, length: 255 })
  refreshToken: string | null;

  @Column('text', { name: 'mission', nullable: true })
  mission: string | null;

  @Column('varchar', { name: 'snsId', nullable: true, length: 255 })
  @IsString()
  @IsNotEmpty()
  snsId: string | null;

  @Column('varchar', { name: 'snsType', nullable: true, length: 255 })
  snsType: string | null;

  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Answer, (answers) => answers.user)
  answers: Answer[];

  @Column('varchar', { name: 'profileUrl', nullable: true, length: 255 })
  profileUrl: string | null;
}
