import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/common/entity/Answer.entity';
import { File } from 'src/common/entity/File.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { User } from 'src/common/entity/User.entity';
import { FilesService } from 'src/files/files.service';
import { MissionsService } from 'src/missions/missions.service';
import { UsersService } from 'src/users/users.service';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Mission, File, User])],
  controllers: [AnswersController],
  providers: [AnswersService, MissionsService, FilesService, UsersService],
})
export class AnswersModule {}
