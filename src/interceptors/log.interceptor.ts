import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      const dt = Date.now();
      //Utilizando a funcao tap do rxjs para retornar o codigo do manipulador de rota
      return next.handle().pipe(tap(() => {

        const request = context.switchToHttp().getRequest();//Pegando a request da rota que chamou o interceptor

        console.log(`URL: ${request.url}  | Method ${request.method}`)
        console.log(`execucao levou: ${Date.now() - dt} ms`);
      }));
    }

}