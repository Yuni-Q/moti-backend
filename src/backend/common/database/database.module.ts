import { Module, Global, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { File } from 'src/backend/common/entity/File.entity';
import { Mission } from 'src/backend/common/entity/Mission.entity';
import { Question } from 'src/backend/common/entity/Question.entity';
import { User } from 'src/backend/common/entity/User.entity';

import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';

function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read();
  return TypeOrmModule.forRoot(
    process.env.NODE_ENV !== 'test'
      ? {
          name: 'default',
          type: 'mysql',
          host: config.DB_HOST,
          port: 3306,
          username: config.DB_USERNAME,
          password: config.DB_PASSWORD,
          database: config.DATABASE,
          synchronize: false,
          logging: true,
          timezone: '+09:00',
          entities: [User, Answer, File, Mission, Question], // 설정 부분
        }
      : {
          keepConnectionAlive: true,
          type: 'sqlite',
          database: 'moti',
          logging: false,
          verboseRetryLog: false,
          synchronize: true,
          entities: [User, Answer, File, Mission, Question], // 설정 부분
        },
  );
}

@Global()
@Module({
  imports: [EnvModule, DatabaseOrmModule()],
})
export class DatabaseModule {}
