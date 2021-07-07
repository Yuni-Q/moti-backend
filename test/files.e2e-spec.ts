import path from 'path';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/backend/app.module';
import { HttpExceptionFilter } from '../src/backend/common/http-exception.filter';

import { hasFileKeys, postFile } from './util/files';
import { signin } from './util/signin';
import { checkStatus } from './util/status';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let token = '';
  let response: request.Response;
  const file = path.join(__dirname, './bigSizeimg.jpeg');

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

    const {
      body: {
        data: { accessToken },
      },
    } = await signin(req);
    token = accessToken;
  });

  it('Post /api/v1/files', async () => {
    const part = 1;
    response = await postFile({ req, token, part, file });
    checkStatus(response, 201);
    expect(hasFileKeys(response.body.data));
    expect(response.body.data.part).toBe(part);
  });

  it('Put /api/v1/files/{id}', async () => {
    const { id } = response.body.data;
    const part = 2;
    response = await putFile({ req, token, id, file, part });
    checkStatus(response);
    expect(hasFileKeys(response.body.data));
  });

  it('Delete /api/v1/files/{id}', async () => {
    const { id } = response.body.data;
    response = await deleteFileById({ req, token, id });
    checkStatus(response, 200);
  });
});

const deleteFileById = async ({
  req,
  token,
  id,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  id: number;
}) => {
  return req.delete(`/api/v1/files/${id}`).set('Authorization', token);
};

const putFile = async ({
  req,
  token,
  id,
  file,
  part,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  id: number;
  file: string;
  part: number;
}) => {
  return req.put(`/api/v1/files/${id}`).set('Authorization', token).field('part', part).attach('file', file);
};
