import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {ThrottlerModule} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000, // Tempo em MS
      limit: 10 // Limite de requests dentro do intervalo setado de ms
      }]
    ),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, useClass: AuthGuard,
  }],
})
export class AppModule {}
