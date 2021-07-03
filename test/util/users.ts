import request from 'supertest';

import { User } from '../../src/backend/common/entity/User.entity';

export const hasUserKeys = (data: User): void => {
  if (!('id' in data)) {
    throw new Error('missing id key');
  }
  if (!('birthday' in data)) {
    throw new Error('missing birthday key');
  }
  if (!('email' in data)) {
    throw new Error('missing email key');
  }
  if (!('name' in data)) {
    throw new Error('missing name key');
  }
  if (!('gender' in data)) {
    throw new Error('missing gender key');
  }
  if (!('snsId' in data)) {
    throw new Error('missing snsId key');
  }
  if (!('snsType' in data)) {
    throw new Error('missing snsType key');
  }
};

export const putUserRefresh = async ({ req, token }: { req: request.SuperTest<request.Test>; token: string }) => {
  return req.put(`/api/v1/users/refresh`).set('Authorization', token);
};
