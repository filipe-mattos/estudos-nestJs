import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthRegisterDto } from '../user/dto/auth-register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private issuer = 'Login';
  private audience = 'Users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly  userService: UserService) {}

  //Utilizando o type user utilizando direto da tabela do banco onde o prisma gerou esse type automaticamente
  createToken(user: User) {
    //Configurando a assinatura do token e o que eu vou retornar nele
    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        name: user.name
      }, {
        expiresIn: '7d',
        issuer: this.issuer,
        subject: String(user.id),
        audience: this.audience,
      })
    }
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        audience: this.audience //Verificando se o token possui a audience pre definida
      })
    } catch (err){
      throw new BadRequestException(err.message);
    }

  }

  async login(email: string, password: string) {

    const user = await this.prismaService.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException("Email ou senha incorretos")
    }

    if(!await bcrypt.compare(password, user.password)){//Utilizando o compare para verificar se as hashs sao as mesmas
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

  async resetPassword(newPassword: string) {
    //TODO: validar o token
    const id = 0 //TODO: resgatar o id do usuario do token
    const user = await this.prismaService.user.update({where: {id}, data: {password: newPassword}});
    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }

  isValidToken(token: string){
    try {
      this.checkToken(token)
      return true
    }catch{
      return false
    }
  }


}