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

  async list() {
    return this.prismaService.user.findMany();// Utilizando o find many para trazer todos os registros da tabela
  }

  async findById(id: number) {
    return this.prismaService.user.findUnique({ //Utilizando o findUnique para trazer somente 1 registro
      //O findUnique so faz consulta pelas chaves primarias da tabela - possui o melhor desempenho
      where: {
        id: id
      }
    })
  }

}