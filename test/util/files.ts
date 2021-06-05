import request from 'supertest';
import { File } from '../../src/backend/common/entity/File.entity';


export const hasFileKeys = (data: File) => {
  if (!('id' in data)) throw new Error('missing id key');
  if (!('cardUrl' in data)) throw new Error('missing cardUrl key');
  if (!('part' in data)) throw new Error('missing part key');
};

export const postFile = async ({
  req,
  token,
  file,
  part,
}: {
  req: request.SuperTest<request.Test>;
  token: string;
  file: string;
  part: number;
}) => {
  return req
    .post('/api/v1/files')
    .set('Authorization', token)
    .field('part', part)
    .attach('file', file);
};