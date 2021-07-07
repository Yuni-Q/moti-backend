import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

import { AnswersModule } from './answers/answers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { EnvModule } from './common/env/env.module';
import { VersionMiddleware } from './common/middlewares/version.middleware';
import { FilesModule } from './files/files.module';
import { MissionsModule } from './missions/missions.module';
import { QuestionsModule } from './questions/questions.module';
import { SigninModule } from './signin/signin.module';
import { UsersModule } from './users/users.module';
import { ViewsModule } from './views/views.module';

const imports = [
  ConfigModule.forRoot(),
  UsersModule,
  DatabaseModule,
  EnvModule,
  SigninModule,
  QuestionsModule,
  MissionsModule,
  AnswersModule,
  FilesModule,
  ViewsModule,
];
if (process.env.NODE_ENV !== 'test') {
  imports.push(MorganModule);
}

const providers =
  process.env.NODE_ENV === 'test'
    ? [AppService]
    : [
        AppService,
        {
          provide: APP_INTERCEPTOR,
          useClass: MorganInterceptor('combined'),
        },
      ];

@Module({
  imports,
  controllers: [AppController],
  providers,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(VersionMiddleware).forRoutes('api/v1');
  }
}
