import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// 권한 설정 같이 사용할 수 있을거 같습니다.
@Injectable()
export class TestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requset = context.switchToHttp().getRequest();
    return false;
  }
}
