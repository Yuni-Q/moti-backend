import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { InvalidTokenDto } from 'src/common/dto/invalid.token.dto';
import { User } from 'src/common/entity/User.entity';
import { InvalidUserIdDto } from 'src/users/dto/invalid.user.id.dto';
import { UsersService } from 'src/users/users.service';
import { SigninResponseDto } from './dto/signin.response.dto';

@Injectable()
export class SigninService {
  constructor(private readonly usersService: UsersService) {}

  async signin(
    token: string,
    snsType: string,
  ): Promise<SigninResponseDto['data']> {
    try {
      let snsId, email;
      if (snsType === 'apple') {
        const snsData =
          process.env.NODE_ENV === 'test'
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
            : ((await jwt.decode(token)) as { sub: string; email: string });
        snsId = snsData.sub;
        email = snsData.email;
      } else if (snsType === 'google') {
        const { data: snsData } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        );
        snsId = snsData.id;
        email = snsData.email;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'snsType가 잘못 되었습니다.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!email || !snsId) {
        throw new HttpException(
          {
            status: HttpStatus.PRECONDITION_FAILED,
            message: '토큰에 필수 정보가 없습니다.',
          },
          HttpStatus.PRECONDITION_FAILED,
        );
      }
      const user = await this.usersService.getUserBySnsIdAndSnsType({
        snsId,
        snsType,
      });
      const signUp = !user ? false : !!(user as User).name ? true : false;
      const newUser = user
        ? user
        : await this.usersService.createUser({ snsId, snsType, email } as User);
      const { accessToken, refreshToken } = await this.createToken(newUser);
      return { accessToken, refreshToken, signUp };
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refresh(token: string): Promise<SigninResponseDto['data']> {
    try {
      const result = jwt.verify(token, process.env.privateKey) as {
        snsId: string;
        snsType: string;
      };
      if (!result?.snsType) {
        throw new HttpException(new InvalidTokenDto(), HttpStatus.BAD_REQUEST);
      }
      const user = await this.usersService.getUserBySnsIdAndSnsType(result);
      if (!user?.id) {
        throw new HttpException(new InvalidUserIdDto(), HttpStatus.BAD_REQUEST);
      }
      const { accessToken, refreshToken } = await this.createToken(user);
      const signUp =
        !!user.name && !!user.birthday && !!user.email && !!user.gender;
      return { accessToken, refreshToken, signUp };
    } catch (e) {
      throw new HttpException(new InvalidTokenDto(), HttpStatus.BAD_REQUEST);
    }
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
