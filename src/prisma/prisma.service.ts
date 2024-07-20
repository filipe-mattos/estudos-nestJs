import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  //Iniciando a conection com o banco de dados
  async onModuleInit() {
    await this.$connect();
  }

}