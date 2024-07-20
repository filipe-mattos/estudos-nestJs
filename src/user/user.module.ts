import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, UserService],
  controllers: [UserController],
  exports: []
})
export class UserModule {}