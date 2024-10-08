import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if(!requiredRoles){
      return true;
    }

    console.log({ requiredRoles });
    const { user }  = context.switchToHttp().getRequest();
    console.log(user);

    const filteredRoles = requiredRoles.filter(role => role === user.role);
    return filteredRoles.length > 0;

  }
}