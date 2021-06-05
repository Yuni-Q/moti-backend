import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/backend/app.module';
import { Question } from '../src/backend/common/entity/Question.entity';
import { HttpExceptionFilter } from '../src/backend/common/http-exception.filter';
import { checkStatus } from './util/status';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // class-validator 적용
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();

    req = request(app.getHttpServer());
  });

  it('Post /api/v1/questions', async () => {
    const content = '나는 누구인가?';
    const response = await postQuestion({ req, content });
    checkStatus(response, 201);
    expect(hasPostApiV1Questions(response.body.data));
  });
  it('Get /api/v1/questions', async () => {
    const response = await GetQuestions({ req });
    checkStatus(response);
    expect(hasPostApiV1Questions(response.body.data.questions[0]));
    expect(typeof response.body.data.questionTotalCount).toBe('number');
  });
  it('Get /api/v1/questions?page=2&limit=10', async () => {
    const response = await GetQuestions({ req });
    checkStatus(response);
    expect(typeof response.body.data.questionTotalCount).toBe('number');
  });
});

const hasPostApiV1Questions = (data: Question) => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('content' in data)) throw new Error('missing content key');
};

const postQuestion = async ({ req, content }: { req: request.SuperTest<request.Test>; content: string }) => {
  return req.post('/api/v1/questions').send({ content });
};

const GetQuestions = async ({ req }: { req: request.SuperTest<request.Test> }) => {
  return req.get('/api/v1/questions');
};
