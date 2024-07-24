import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthRegisterDto } from '../user/dto/auth-register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly  userService: UserService) {}

  //Utilizando o type user utilizando direto da tabela do banco onde o prisma gerou esse type automaticamente
  async createToken(user: User) {
    //Configurando a assinatura do token e o que eu vou retornar nele
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        name: user.name
      }, {
        expiresIn: '8h',
        issuer: 'Login',
        subject: String(user.id),
        audience: 'Users'
      })
    }
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

    return this.createToken(user);
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
    const user = await this.prismaService.user.update({where: {id}, data: {password: newPassword}});
    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}