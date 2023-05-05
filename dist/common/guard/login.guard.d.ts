import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class LoginGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
