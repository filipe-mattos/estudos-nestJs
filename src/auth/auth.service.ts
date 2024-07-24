import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prismaService: PrismaService) {}

  async createToken() {
    return this.jwtService.sign({})
  }

  async checkToken() {
    //return this.jwtService.verify()
  }

  async login(email: string, password: string) {
   const user = await this.prismaService.user.findFirst({
      where: {
        email,
        password
      }
    })

    if (!user) {
      throw new UnauthorizedException("Email ou senha incorretos")
    }

    return user;
  }

  async forgotPassword(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException("Email esta incorreto")
    }

    return true //TO DO Enviar email
  }
  async resetPassword(newPassword: string, token: string) {
    //TODO: validar o token
    const id = 0 //TODO: resgatar o id do usuario do token
    await this.prismaService.user.update({where: {id}, data: {password: newPassword}});
    return true
  }
}