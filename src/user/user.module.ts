import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UserIdCheckMiddleware } from '../middlewares/user-id-check.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(UserIdCheckMiddleware).forRoutes({
        path: "/users/:id",
        method: RequestMethod.ALL,
      }) //Aplicando o uso do middleware no modulo e especificando quais rotas vao utilizar
    }
}