import { Injectable } from '@nestjs/common';
import axios from 'axios';
import jwt from 'jsonwebtoken';

@Injectable()
export class SigninService {
  async jwtOauth2(
    token: string,
  ): Promise<{ data: { id: string; email: string } }> {
    return axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    );
  }

  async jwtDecode(token: string): Promise<{ sub: string; email: string }> {
    return jwt.decode(token);
  }

  async createToken({
    id,
    snsId,
    snsType,
  }: {
    id: number;
    snsId: string;
    snsType: string;
  }) {
    const accessToken = await jwt.sign(
      {
        user: {
          id,
        },
      },
      process.env.privateKey as string,
      { expiresIn: 7 * 24 * 60 * 60 },
    );
    const refreshToken = await jwt.sign(
      {
        snsId,
        snsType,
      },
      process.env.privateKey as string,
      { expiresIn: 30 * 24 * 60 * 60 },
    );
    return { accessToken, refreshToken };
  }
}
