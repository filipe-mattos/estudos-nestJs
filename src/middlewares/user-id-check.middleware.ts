import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Request, next: NextFunction) {

      if(isNaN(Number(req.params.id)) || Number(req.params.id) <= 0){
        throw new BadRequestException('ID INVALIDO');
      }

      next(); // Utilizando o next para continuar o fluxo de execucao da aplicacao
    }

}