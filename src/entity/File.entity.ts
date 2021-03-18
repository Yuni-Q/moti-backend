import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './Answer.entity';

@Entity('files', { schema: 'chocopie' })
export class File extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'cardUrl', nullable: true, length: 255 })
  cardUrl: string | null;

  @Column('int', { name: 'part', nullable: true })
  part: number | null;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('varchar', { name: 'cardSvgUrl', nullable: true, length: 255 })
  cardSvgUrl: string | null;

  @Column('varchar', { name: 'cardPngUrl', nullable: true, length: 255 })
  cardPngUrl: string | null;

  @OneToMany(() => Answer, (answers) => answers.file)
  answers: Answer[];
}
