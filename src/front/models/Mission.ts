import { IncomingMessage } from 'http';

import API from '../utils/API';

export default class Mission {
  protected static readonly api: API = new API('/api');

  id?: number;

  title?: string;

  isContent?: boolean;

  isImage?: boolean;

  cycle?: number;

  createdAt?: Date;

  updatedAt?: Date;

  public static getMissionsId({
    id,
    token,
    req,
  }: {
    id: string;
    token: string;
    req?: IncomingMessage;
  }): Promise<Mission> {
    return this.api.get(
      `/v1/missions/${id}/`,
      {},
      {
        headers: { Authorization: token },
        extra: { req },
      },
    );
  }

  public static getMissions({
    token,
    req,
  }: {
    token: string;
    req?: IncomingMessage;
  }): Promise<{ missions: Mission[]; refresh: boolean }> {
    return this.api.get(
      `/v1/missions/`,
      {},
      {
        headers: { Authorization: token },
        extra: { req },
      },
    );
  }

  public static getMissionsRefresh({
    token,
    req,
  }: {
    token: string;
    req?: IncomingMessage;
  }): Promise<{ missions: Mission[]; refresh: boolean }> {
    return this.api.get(
      `/v1/missions/refresh/`,
      {},
      {
        headers: { Authorization: token },
        extra: { req },
      },
    );
  }
}
