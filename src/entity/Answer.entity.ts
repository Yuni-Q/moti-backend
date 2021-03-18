import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from './File.entity';
import { Mission } from './Mission.entity';
import { User } from './User.entity';

@Index('missionId', ['missionId'], {})
@Index('fileId', ['fileId'], {})
@Index('userId', ['userId'], {})
@Entity('answers', { schema: 'chocopie' })
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'imageUrl', nullable: true, length: 255 })
  imageUrl: string | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('varchar', { name: 'date', nullable: true, length: 255 })
  date: string | null;

  @Column('varchar', { name: 'setDate', nullable: true, length: 255 })
  setDate: string | null;

  @Column('int', { name: 'no', nullable: true })
  no: number | null;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('int', { name: 'missionId', nullable: true })
  missionId: number | null;

  @Column('int', { name: 'fileId', nullable: true })
  fileId: number | null;

  @Column('int', { name: 'userId', nullable: true })
  userId: number | null;

  @ManyToOne(() => Mission, (missions) => missions.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'missionId', referencedColumnName: 'id' }])
  mission: Mission;

  @ManyToOne(() => File, (files) => files.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'fileId', referencedColumnName: 'id' }])
  file: File;

  @ManyToOne(() => User, (users) => users.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
