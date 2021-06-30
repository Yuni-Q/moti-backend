import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from '../entity/User.entity';

// 권한 설정 같이 사용할 수 있을거 같습니다.
@Injectable()
export class LoginGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization as string;
    if (!token) {
      return false;
    }
    if ((token as string).startsWith('Bearer ')) {
      token = token.slice(7);
    }
    let result;
    try {
      result = (await jwt.verify(token, process.env.privateKey as string)) as {
        user: {
          id: number;
        };
      };
    } catch (e) {
      console.log('token.user.id.decorator token1', token);
      console.log(e);
      return false;
    }
    if (typeof result === 'object' && (!('user' in result) || !result.user.id)) {
      console.log('token.user.id.decorator token2', token);
      return false;
    }
    const user = await getRepository(User).findOne({ where: { id: result.user.id } });
    if (!user?.id) {
      return false;
    }
    return true;
  }
}
