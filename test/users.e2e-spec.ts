import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/backend/app.module';
import { HttpExceptionFilter } from '../src/backend/common/http-exception.filter';

import { signin } from './util/signin';
import { checkStatus } from './util/status';
import { hasUserKeys } from './util/users';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let token = '';
  let response: request.Response;

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

  it('Put /api/v1/users', async () => {
    const name = '김유정';
    const birthday = '1997-01-16';
    const gender = '여';
    response = await putUser({ req, token, name, birthday, gender });
    checkStatus(response);
    expect(hasUserKeys(response.body.data));
    expect(response.body.data.name).toBe(name);
    expect(response.body.data.birthday).toBe(birthday);
    expect(response.body.data.gender).toBe(gender);
  });

  it('Get /api/v1/users', async () => {
    response = await getUsers({ req, token });
    checkStatus(response);
    expect(hasUserKeys(response.body.data[0]));
  });

  it('Get /api/v1/users/my', async () => {
    response = await getUserByToken({ req, token });
    checkStatus(response);
    expect(hasUserKeys(response.body.data));
  });

  it('Get /api/v1/users/{id}', async () => {
    const { id } = response.body.data;
    response = await getUser({ req, token, id });
    checkStatus(response);
    expect(hasUserKeys(response.body.data));
  });

  // TODO : 다른 테스트에 영향이 가서 유저 삭제 보류
  // it('Delete /api/v1/users', async () => {
  //   response = await deleteUser({ req, token });
  //   checkStatus(response);
  //   expect(response.body.message).toBe('유저를 삭제 했습니다.');
  // });
});

const putUser = async ({
  req,
  token,
  name,
  birthday,
  gender,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  name: string;
  birthday: string;
  gender: string;
}) => {
  return req.put(`/api/v1/users`).set('Authorization', token).send({ name, birthday, gender });
};

const getUsers = async ({ req, token }: { req: request.SuperTest<request.Test>; token: string }) => {
  return req.get(`/api/v1/users`).set('Authorization', token);
};

const getUserByToken = async ({ req, token }: { req: request.SuperTest<request.Test>; token: string }) => {
  return req.get(`/api/v1/users/my`).set('Authorization', token);
};

const getUser = async ({ req, token, id }: { req: request.SuperTest<request.Test>; token: string; id: number }) => {
  return req.get(`/api/v1/users/${id}`).set('Authorization', token);
};

const deleteUser = async ({ req, token }: { req: request.SuperTest<request.Test>; token: string }) => {
  return req.delete(`/api/v1/users`).set('Authorization', token);
};
