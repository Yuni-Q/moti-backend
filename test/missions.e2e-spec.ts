import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/backend/app.module';
import { HttpExceptionFilter } from '../src/backend/common/http-exception.filter';
import { hasMissionKeys, postMission } from './util/missions';
import { signin } from './util/signin';
import { checkStatus } from './util/status';
import { hasUserKeys, putUserRefresh } from './util/users';

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

  it('Post /api/v1/missions', async () => {
    const title = '안녕';
    const isContent = true;
    const isImage = false;
    const cycle = 1;
    response = await postMission({
      req,
      token,
      title,
      isContent,
      isImage,
      cycle,
    });
    checkStatus(response, 201);
    expect(hasMissionKeys(response.body.data));
    expect(response.body.data.title).toBe(title);
    expect(response.body.data.isContent).toBe(isContent);
    expect(response.body.data.isImage).toBe(isImage);
    expect(response.body.data.cycle).toBe(cycle);
  });

  it('Get /api/v1/missions/{id}', async () => {
    const { id } = response.body.data;
    response = await getMissionById({ req, token, id });
    checkStatus(response);
    expect(hasMissionKeys(response.body.data));
  });

  it('Put /api/v1/missions/{id}', async () => {
    const title = '문제수정';
    const isContent = false;
    const isImage = true;
    const cycle = 2;
    const { id } = response.body.data;
    response = await putMission({
      req,
      token,
      id,
      title,
      isContent,
      isImage,
      cycle,
    });
    checkStatus(response);
    expect(hasMissionKeys(response.body.data));
    expect(response.body.data.title).toBe(title);
    expect(response.body.data.isContent).toBe(isContent);
    expect(response.body.data.isImage).toBe(isImage);
    expect(response.body.data.cycle).toBe(cycle);
  });

  it('Delete /api/v1/missions/{id}', async () => {
    const { id } = response.body.data;
    response = await deleteMission({ req, token, id });
    checkStatus(response, 200);
  });
});

describe('AppController (e2e)', () => {
  let req: request.SuperTest<request.Test>;
  let token = '';
  let response: request.Response;
  let mission1: request.Response;
  let mission2: request.Response;
  let mission3: request.Response;

  beforeAll(async () => {
    let app: INestApplication;

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


  it('Post /api/v1/missions', async () => {
    const title = '안녕';
    const isContent = true;
    const isImage = false;
    const cycle = 1;
    mission1 = await postMission({
      req,
      token,
      title,
      isContent,
      isImage,
      cycle,
    });
    mission2 = await postMission({
      req,
      token,
      title,
      isContent,
      isImage,
      cycle,
    });
    mission3 = await postMission({
      req,
      token,
      title,
      isContent,
      isImage,
      cycle,
    });
  });

  it('Get /api/v1/missions', async () => {
    const {
      body: {
        data: { accessToken },
      },
    } = await signin(req);
    token = accessToken;
    response = await getMissions({ req, token });
    checkStatus(response);
    expect('refresh' in response.body.data).toBeTruthy();
    // expect(response.body.data.missions.length).toBe(3);
    // expect(hasMissionKeys(response.body.data.missions[0]));
    // expect(hasMissionKeys(response.body.data.missions[1]));
    // expect(hasMissionKeys(response.body.data.missions[2]));
  });

  it('Get /api/v1/missions/refresh', async () => {
    const responseUserRefresh = await putUserRefresh({ req, token });
    checkStatus(responseUserRefresh);
    expect(hasUserKeys(responseUserRefresh.body.data));

    response = await getMissionRefresh({ req, token });
    checkStatus(response);
    expect(response.body.data.refresh).toBe(false);
    // expect(response.body.data.missions.length).toBe(3);
    // expect(hasMissionKeys(response.body.data.missions[0]));
    // expect(hasMissionKeys(response.body.data.missions[1]));
    // expect(hasMissionKeys(response.body.data.missions[2]));
  });

  it('Get /api/v1/missions/refresh before refresh', async () => {
    response = await getMissionRefresh({ req, token });
    checkStatus(response, 400);

    expect(response.body.message).toBe('갱신 횟수가 모자랍니다.');
  });

  it('Delete /api/v1/missions/{id}', async () => {
    mission1 = await req
      .delete(`/api/v1/missions/${mission1.body.data.id}`)
      .set('Authorization', token);
    mission2 = await req
      .delete(`/api/v1/missions/${mission2.body.data.id}`)
      .set('Authorization', token);
    mission3 = await req
      .delete(`/api/v1/missions/${mission3.body.data.id}`)
      .set('Authorization', token);
  });

});

const getMissionById = async ({
  req,
  token,
  id,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  id: number;
}) => {
  return req.get(`/api/v1/missions/${id}`).set('Authorization', token);
};

const putMission = async ({
  req,
  token,
  id,
  title,
  isContent,
  isImage,
  cycle,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  id: number;
  title: string;
  isContent: boolean;
  isImage: boolean;
  cycle: number;
}) => {
  return req
    .put(`/api/v1/missions/${id}`)
    .set('Authorization', token)
    .send({ title, isContent, isImage, cycle });
};

const deleteMission = async ({
  req,
  token,
  id,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  id: number;
}) => {
  return req.delete(`/api/v1/missions/${id}`).set('Authorization', token);
};

const getMissions = async ({ req, token }: { req: request.SuperTest<request.Test>; token: string }) => {
  return req.get(`/api/v1/missions`).set('Authorization', token);
};

const getMissionRefresh = async ({
  req,
  token,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
}) => {
  return req.get(`/api/v1/missions/refresh`).set('Authorization', token);
};
