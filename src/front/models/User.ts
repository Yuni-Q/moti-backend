import { IncomingMessage } from 'http';

import API from '../utils/API';

export default class User {
  protected static readonly api: API = new API('/api');

  id?: number;

  birthday?: string;

  email?: string;

  name?: string;

  gender?: string;

  refreshDate?: string;

  refreshToken?: string;

  mission?: string;

  snsId?: string;

  snsType?: 'google' | 'apple';

  createdAt?: string;

  updatedAt?: string;

  public static getUsersMy({ token, req }: { token: string; req?: IncomingMessage }): Promise<User> {
    return this.api.get(
      `/v1/users/my/`,
      {},
      {
        headers: { Authorization: token },
        extra: { req },
      },
    );
  }

  public static deleteUser({ token, req }: { token: string; req?: IncomingMessage }): Promise<void> {
    return this.api.delete(
      `/v1/users/`,
      {},
      {
        headers: { Authorization: token },
        extra: { req },
      },
    );
  }

  public static putUser({
    token,
    body,
    req,
  }: {
    token: string;
    body: { name: string; gender: string; birthday?: string };
    req?: IncomingMessage;
  }): Promise<void> {
    return this.api.put(`/v1/users/`, body, {
      headers: { Authorization: token },
      extra: { req },
    });
  }
}
