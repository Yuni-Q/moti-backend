import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entity/User.entity';
import { UsersService } from 'src/users/users.service';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SigninController],
  providers: [SigninService, UsersService],
})
export class SigninModule {}
