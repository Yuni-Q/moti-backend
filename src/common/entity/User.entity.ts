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

  @Column('varchar', { name: 'birthday', nullable: true, length: 255 })
  birthday: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('varchar', { name: 'gender', nullable: true, length: 255 })
  gender: string | null;

  @Column('varchar', { name: 'refreshDate', nullable: true, length: 255 })
  refreshDate: string | null;

  @Column('varchar', { name: 'refreshToken', nullable: true, length: 255 })
  refreshToken: string | null;

  @Column('text', { name: 'mission', nullable: true })
  mission: string | null;

  @Column('varchar', { name: 'snsId', nullable: true, length: 255 })
  snsId: string | null;

  @Column('varchar', { name: 'snsType', nullable: true, length: 255 })
  snsType: string | null;

  @CreateDateColumn({ type: 'datetime', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Answer, (answers) => answers.user)
  answers: Answer[];
}
