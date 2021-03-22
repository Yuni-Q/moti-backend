import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersService } from 'src/answers/answers.service';
import { Answer } from 'src/common/entity/Answer.entity';
import { File } from 'src/common/entity/File.entity';
import { Mission } from 'src/common/entity/Mission.entity';
import { User } from 'src/common/entity/User.entity';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, User, Answer, File])],
  controllers: [MissionsController],
  providers: [MissionsService, AnswersService, UsersService, FilesService],
})
export class MissionsModule {}
