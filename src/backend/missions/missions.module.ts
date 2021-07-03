import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersService } from 'src/backend/answers/answers.service';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { File } from 'src/backend/common/entity/File.entity';
import { Mission } from 'src/backend/common/entity/Mission.entity';
import { User } from 'src/backend/common/entity/User.entity';
import { FilesService } from 'src/backend/files/files.service';
import { UsersService } from 'src/backend/users/users.service';

import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, User, Answer, File])],
  controllers: [MissionsController],
  providers: [MissionsService, AnswersService, UsersService, FilesService],
})
export class MissionsModule {}
