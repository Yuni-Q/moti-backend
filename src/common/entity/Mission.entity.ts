import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './Answer.entity';

@Entity('missions', { schema: 'chocopie' })
export class Mission extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('tinyint', { name: 'isContent', nullable: true, width: 1 })
  isContent: boolean | null;

  @Column('tinyint', { name: 'isImage', nullable: true, width: 1 })
  isImage: boolean | null;

  @Column('int', { name: 'cycle', nullable: true })
  cycle: number | null;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Answer, (answers) => answers.mission)
  answers: Answer[];
}
