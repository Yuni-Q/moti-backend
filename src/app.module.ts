import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { EnvModule } from './common/env/env.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { VersionMiddleware } from './common/middlewares/version.middleware';
import { FilesModule } from './files/files.module';
import { MissionsModule } from './missions/missions.module';
import { QuestionsModule } from './questions/questions.module';
import { SigninModule } from './signin/signin.module';
import { UsersModule } from './users/users.module';

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
    consumer.apply(VersionMiddleware).forRoutes('api/v1');
  }
}
