import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/backend/common/entity/User.entity';
import { UsersService } from 'src/backend/users/users.service';

import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SigninController],
  providers: [SigninService, UsersService],
})
export class SigninModule {}
