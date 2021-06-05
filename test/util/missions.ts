import request from 'supertest';
import { Mission } from '../../src/backend/common/entity/Mission.entity';

export const hasMissionKeys = (data: Mission) => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('title' in data)) throw new Error('missing title key');
  if (!('isContent' in data)) throw new Error('missing isContent key');
  if (!('isImage' in data)) throw new Error('missing isImage key');
  if (!('cycle' in data)) throw new Error('missing cycle key');
};

export const postMission = async ({
  req,
  token,
  title,
  isContent,
  isImage,
  cycle,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  title: string;
  isContent: boolean;
  isImage: boolean;
  cycle: number;
}) => {
  return req
    .post('/api/v1/missions')
    .set('Authorization', token)
    .send({ title, isContent, isImage, cycle });
};

