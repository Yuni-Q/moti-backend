import { Response } from 'supertest';

export const checkStatus = (response: Response, code = 200): void => {
  expect(response.status).toBe(code);
  if (code !== 204) {
    expect(response.body.status).toBe(code);
  }
};
