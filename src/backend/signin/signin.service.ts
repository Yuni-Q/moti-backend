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
    const snsData =
      process.env.NODE_ENV !== 'test'
        ? {
            // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLm1hc2h1cC5haG9ic3UuQWhvYnN1IiwiZXhwIjoxNjE2MTYzNjE5LCJpYXQiOjE1ODEyNTQxOTAsInN1YiI6IjAwMTgxMy43MWY5N2JlZjQ4MzI0ZmIyOTQ1MWEzM2UwNWQyY2Y1ZC4wOTA4IiwiY19oYXNoIjoiS0IwVzc1enZJRkVjWTl6Vy03OXV4USIsImVtYWlsIjoiajV2dmQ5eHRyYkBwcml2YXRlcmVsYXkuYXBwbGVpZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJpc19wcml2YXRlX2VtYWlsIjoidHJ1ZSIsImF1dGhfdGltZSI6MTU4MTI1NDE5MCwianRpIjoiYzJmYzUxYTItYzJjOS00MzkzLWJmNWEtNjI1MzcxYmNiZTA4In0.gvLaeAtvyXLHqicQ9eWw3G6Kia9HJr03hzS2NWkJz-8
            iss: 'https://appleid.apple.com',
            // "iss": "https://accounts.google.com",
            aud: 'com.mashup.ahobsu.Ahobsu',
            exp: 1581254790,
            iat: 1581254190,
            sub: '001813.71f97bef48324fb29451a33e05d2cf5d.0908',
            c_hash: 'KB0W75zvIFEcY9zW-79uxQ',
            email: 'j5vvd9xtrb@privaterelay.appleid.com',
            email_verified: 'true',
            is_private_email: 'true',
            auth_time: 1581254190,
          }
        : await jwt.decode(token);
    return snsData;
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
