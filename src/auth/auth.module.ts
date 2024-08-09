import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';

//Definindo secret do jwt token
@Module({
  imports: [
    JwtModule.register({ secret: 'y|6nB&!N}q{li^4i,&c(T&Wf@gE;wT&Y'}),
    forwardRef(() => UserModule),
    PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}