import { createParamDecorator, ExecutionContext, NotFoundException, UnauthorizedException } from '@nestjs/common';

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if(request.user) {
    if(filter){
      return request.user[filter];
    }
    return request.user;
  }else{
    throw new NotFoundException('Usuario nao encontrado no Request. Utilize o authGuard na rota');
  }

})