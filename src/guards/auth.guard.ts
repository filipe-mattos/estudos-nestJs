import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}


  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try{
      request.tokenPayload = this.authService.checkToken((authorization ?? '').split(' ')[1]);
      request.user = await this.userService.findById(request.tokenPayload.id)
      return true;
    }catch{
      return false;
    }


    }
}