import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/backend/app.module';
import { HttpExceptionFilter } from '../src/backend/common/http-exception.filter';
import { signin } from './util/signin';
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

  it('Post /api/v1/signin', async () => {
    const response = await signin(req);
    checkStatus(response, 201);
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
  });

  it('Post /api/v1/signin/refresh', async () => {
    const {
      body: {
        data: { refreshToken },
      },
    } = await signin(req);
    const response = await checkRefreshToken({ req, refreshToken });
    checkStatus(response, 201);
    expect(hasPostApiV1SigninRefreshKeys(response.body.data));
  });
});

const hasPostApiV1SigninRefreshKeys = (data: {
  accessToken: string;
  refreshToken: string;
  signUp: boolean;
}) => {
  if (!('accessToken' in data)) throw new Error('missing accessToken key');
  if (!('refreshToken' in data)) throw new Error('missing refreshToken key');
  if (!('signUp' in data)) throw new Error('missing signUp key');
};

const checkRefreshToken = async ({
  req,
  refreshToken,
}: {
  req: request.SuperTest<request.Test>;
  refreshToken: string;
}) => {
  return req.post('/api/v1/signin/refresh').set('Authorization', refreshToken);
};
