import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { File } from 'src/backend/common/entity/File.entity';
import { Mission } from 'src/backend/common/entity/Mission.entity';
import { User } from 'src/backend/common/entity/User.entity';
import { FilesService } from 'src/backend/files/files.service';
import { MissionsService } from 'src/backend/missions/missions.service';
import { UsersService } from 'src/backend/users/users.service';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Mission, File, User])],
  controllers: [AnswersController],
  providers: [AnswersService, MissionsService, FilesService, UsersService],
})
export class AnswersModule {}
