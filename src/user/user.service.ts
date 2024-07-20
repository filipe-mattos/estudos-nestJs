import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: userDto, //Dados que quero salvar no banco
      select: { //Ao inserir o create vai trazer os seguintes dados
        id: true,
        name: true
      }
    })
  }
}