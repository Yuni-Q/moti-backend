import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { EnvModule } from './common/env/env.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { SigninController } from './signin/signin.controller';
import { SigninModule } from './signin/signin.module';
import { QuestionsModule } from './questions/questions.module';
import { MissionsModule } from './missions/missions.module';
import { AnswersController } from './answers/answers.controller';
import { AnswersModule } from './answers/answers.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    DatabaseModule,
    EnvModule,
    SigninModule,
    QuestionsModule,
    MissionsModule,
    AnswersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
