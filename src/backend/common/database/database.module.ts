import { Module, Global, DynamicModule } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/backend/common/entity/User.entity';
import { Answer } from 'src/backend/common/entity/Answer.entity';
import { File } from 'src/backend/common/entity/File.entity';
import { Mission } from 'src/backend/common/entity/Mission.entity';
import { Question } from 'src/backend/common/entity/Question.entity';

function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read();
  const options =
    process.env.NODE_ENV === 'test'
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
          // type: ''
          //   username: 'root',
          //   password: 'root',
          //   database: 'chocopie',
          //   storage: ':memory:',
          //   host: 'localhost',
          //   dialect: 'sqlite',
          //   logging: false,
        };
  console.log(111, process.env.NODE_ENV);
  return TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'moti',
    logging: false,
    synchronize: true,
    entities: [User, Answer, File, Mission, Question], // 설정 부분
  });
}

@Global()
@Module({
  imports: [EnvModule, DatabaseOrmModule()],
})
export class DatabaseModule {}
