import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, await bcrypt.genSalt()); // criptografando a senha do usuario e aplicando um salt
    return this.prismaService.user.create({
      data: userDto, //Dados que quero salvar no banco
      // select: { //Ao inserir o create vai trazer os seguintes dados
      //   id: true,
      //   name: true
      // }
    })
  }

  async list() {
    return this.prismaService.user.findMany();// Utilizando o find many para trazer todos os registros da tabela
  }

  async findById(id: number) {
    await this.exists(id)
    return this.prismaService.user.findUnique({ //Utilizando o findUnique para trazer somente 1 registro
      //O findUnique so faz consulta pelas chaves primarias da tabela - possui o melhor desempenho
      where: {
        id: id
      }
    })
  }

  async update({email, name, birthAt, password, role}: UpdatePutUserDto, id: number) {

    await this.exists(id);
    password = await bcrypt.hash(password, await bcrypt.genSalt())
    return this.prismaService.user.update(
      {data: {email, name, birthAt:birthAt ? new Date(birthAt): null, password, role},
        where: {
          id: id
        }
      })
  }

  async updatePartial({email, name, birthAt, password, role}: UpdatePatchUserDto, id: number) {

    await this.exists(id);
    password = await bcrypt.hash(password, await bcrypt.genSalt())
    return this.prismaService.user.update(
      {data: {email, name, birthAt:birthAt ? new Date(birthAt): null, password, role},
        where: {
          id: id
        }
      })
  }

  async delete(id: number) {

    await this.exists(id);

    return this.prismaService.user.delete({where: {id: id}});
  }

  async exists(id: number) {
    if(!(await this.prismaService.user.count({where: {id: id}}))){
      throw new NotFoundException("Not found");
    }
  }

}